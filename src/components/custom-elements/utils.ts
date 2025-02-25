

export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  let val = e.target.value;
  e.target.value = '';
  e.target.value = val;
};

