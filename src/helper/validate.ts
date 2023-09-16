export const validateInput = (text: string, cb: (text: string) => void) => {
  if (text === '') {
    cb('入力値が空です');
    return true;
  }
  return false;
};
