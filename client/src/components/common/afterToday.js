const afterToday = date => {
  //date must be a String with yyyy-mm-dd format
  
  const partedDate = date.split('-');
  return (new Date() < new Date(`${partedDate[1]}-${partedDate[2]}-${partedDate[0]}`));
}

export default afterToday;