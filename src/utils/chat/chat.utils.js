export const getTimeWhenMessageIsCreated = () => {
  const date = new Date();
  return `
    ${date.getFullYear()}
    ${date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth() + 1}
    ${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}
    ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}
    ${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}
  `;
};
