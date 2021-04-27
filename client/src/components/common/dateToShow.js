import months from './months';
//"2021-04-13"

const dateToShow = (date) => {
  
  if (!date) return "";

  const separatedDate = date.split('-');

  const dateString = `${separatedDate[2]} de ${months[separatedDate[1]]} de ${separatedDate[0]}`

  return dateString
}

export default dateToShow