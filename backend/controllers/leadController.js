// controllers/leadController.js
const Lead = require('../models/Lead');
const User = require('../models/User');
const Sale = require('../models/Sale');
const Activity = require('../models/Activity')
const CsvBatch = require('../models/CsvBatch')

// Add Lead
// /api/leads/add
exports.createLead = async (req, res) => {
  try {
    const leadData = req.body;

    const newLead = new Lead(leadData);
    await newLead.save();

    // Assign lead to user (if assignedTo is given)
    if (leadData.assignedTo) {
      await User.findByIdAndUpdate(leadData.assignedTo, {
        $push: { assignedLeads: newLead._id },
      });
    }

    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Failed to create lead' });
  }
};
 

// Get leads for a specific user
// /api/leads/user/:userId
exports.getLeadsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const leads = await Lead.find({ assignedTo: userId }).populate('assignedTo', 'name email');

    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads for user:', error);
    res.status(500).json({ message: 'Failed to fetch user-specific leads' });
  }
};

// Update leads for a specific user
// /api/leads/update/:id
exports.updateLeadDetails = async (req, res) => {
  const { id } = req.params;
  const { type, schedule_date, schedule_time, status } = req.body;

  try {
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Track original status to detect status change
    const wasClosed = lead.status === 'closed';

    if (type) lead.type = type;
    if (status) lead.status = status;
    if (schedule_date) lead.schedule_date = schedule_date;
    if (schedule_time) lead.schedule_time = schedule_time;

    await lead.save();

    // Only create Sale if status has changed to 'closed' and wasn't already closed
    if (status === 'closed' && !wasClosed && lead.assignedTo) {
      const now = new Date()

      // 1. Create sale
      await Sale.create({
        employee: lead.assignedTo,
        sale_date: now
      })

      // 2. Update closedLeads array
      await User.findByIdAndUpdate(
        lead.assignedTo,
        { $addToSet: { closedLeads: lead._id } }
      )

      // 3. Create activity
      await Activity.create({
        type: 'closed',
        employee: lead.assignedTo,
        date: now.toISOString().split('T')[0], // YYYY-MM-DD
        time: now.toTimeString().split(' ')[0]  // HH:mm:ss
      })
    }

    res.status(200).json({ message: 'Lead updated successfully', lead });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload leads from CSV
// /api/leads/bulk-upload
exports.uploadLeadsFromCSV = async (req, res) => {
  const leadsArray = req.body.leads // this will be an array of objects from CSV
  try {
    const createdLeads = await Lead.insertMany(leadsArray)
    res.status(201).json({ message: 'Leads created from CSV', data: createdLeads })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get csv batches
exports.getCSVBatches = async (req, res) => {
  try {
    const batches = await CsvBatch.find().sort({ uploadDate: -1 })

    const result = await Promise.all(
      batches.map(async (batch) => {
        const leads = await Lead.find({ batchId: batch._id })
        const assignedCount = leads.filter((lead) => lead.assignedTo).length

        return {
          _id: batch._id,
          name: batch.name,
          uploadDate: batch.uploadDate,
          totalLeads: leads.length,
          assignedCount,
        }
      })
    )

    res.json(result)
  } catch (err) {
    console.error('Error fetching CSV batches:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// get all leads
exports.getAllLeads = async (req, res) => {
	try {
		const leads = await Lead.find().sort({ createdAt: -1 })
		res.status(200).json(leads)
	} catch (err) {
		res.status(500).json({ message: 'Failed to fetch leads', error: err.message })
	}
}

// assign leads to employees
// /api/leads/assign-leads
exports.assignLeadsToEmployees = async (req, res) => {
  try {
    const allEmployees = await User.find({ role: 'employee' })

    if (allEmployees.length === 0) {
      return res.status(400).json({ message: 'No employees found' })
    }

    const allLeads = await Lead.find({ assignedTo: null })
    let assignedCount = 0

    const chunkSize = Math.floor(allLeads.length / allEmployees.length)
    let remainder = allLeads.length % allEmployees.length
    let index = 0

    const now = new Date()
    const currentDate = now.toISOString().split('T')[0]
    const currentTime = now.toTimeString().split(' ')[0]

    for (let i = 0; i < allEmployees.length; i++) {
      const count = chunkSize + (remainder > 0 ? 1 : 0)
      remainder--

      const leadsToAssign = allLeads.slice(index, index + count)
      for (const lead of leadsToAssign) {
        lead.assignedTo = allEmployees[i]._id
        await lead.save()
        assignedCount++

        // Create activity of the lead
        await Activity.create({
          type: 'assigned',
          employee: allEmployees[i]._id,
          date: currentDate,
          time: currentTime
        })
      }
      index += count
    }

    const remainingLeads = await Lead.find({ assignedTo: null })
    for (const lead of remainingLeads) {
      const match = allEmployees.find(
        (emp) => emp.language === lead.language && emp.location === lead.location
      )
      if (match) {
        lead.assignedTo = match._id
        await lead.save()
        assignedCount++

        await Activity.create({
          type: 'assigned',
          employee: match._id,
          date: currentDate,
          time: currentTime
        })
      }
    }

    const stillUnassigned = await Lead.find({ assignedTo: null })
    for (const lead of stillUnassigned) {
      const match = allEmployees.find(
        (emp) => emp.language === lead.language || emp.location === lead.location
      )
      if (match) {
        lead.assignedTo = match._id
        await lead.save()
        assignedCount++

        await Activity.create({
          type: 'assigned',
          employee: match._id,
          date: currentDate,
          time: currentTime
        })
      }
    }

    const finalUnassigned = await Lead.find({ assignedTo: null }).countDocuments()

    res.status(200).json({
      message: 'Leads assignment complete',
      totalAssigned: assignedCount,
      unassigned: finalUnassigned
    })
  } catch (err) {
    console.error('Lead assignment failed:', err)
    res.status(500).json({ message: 'Server error during lead assignment' })
  }
}



// // Get All Leads
// exports.getAllLeads = async (req, res) => {
//   try {
//     const leads = await Lead.find().populate('assignedTo', 'name email');
//     res.status(200).json(leads);
//   } catch (error) {
//     console.error('Error fetching leads:', error);
//     res.status(500).json({ message: 'Failed to fetch leads' });
//   }
// };
