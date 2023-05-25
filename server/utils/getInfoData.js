const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

export default getSelectData;
