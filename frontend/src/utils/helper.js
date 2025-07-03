export const validateEmail = (email) =>{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // This regex checks for a valid email format
  // It ensures that the email contains characters before and after the '@' symbol,
  // and a domain with at least one '.' character.
   return regex.test(email);
}

export const getInitials = (title) => {
   if (!title) return "";

   const words = title.split(" ");
   let initials = "";

   for (let i = 0; i < Math.min(words.length, 2); i++){
     initials += words[i][0];
   }

   return initials.toUpperCase();
}
  
