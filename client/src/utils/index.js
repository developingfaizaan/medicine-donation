export const nameInitialsGenerator = (name) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

  let initials = [...name.matchAll(rgx)] || [];

  initials = (
    (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
  ).toUpperCase();

  return initials;
};


export const emailBodyGenerate = (orgName, medicine) => {

  return `I hope this email finds you well. I am reaching out to you from ${orgName} organization regarding an urgent requirement for "${medicine}" medicine. We noticed that you have registered with DaanPunya as a donor for this medicine.

  \n We have a patient who urgently requires this medicine, but is unable to afford a new pack. Your donation can make a huge difference in their recovery and we would be extremely grateful for your contribution.
  
  \n If you are still able to donate the medicine, please let us know and we will arrange for a volunteer/courier to pick it up from your location at your convenience. Our organization will take care of all the necessary logistics.
  
  \n Thank you for your support and kindness in helping those in need. Please feel free to contact us if you have any questions or concerns.
  `
}

