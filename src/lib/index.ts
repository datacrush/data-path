export const foo = (elementRef: React.RefObject<HTMLInputElement>) => {
  const element = elementRef.current;

  const getPoints = () => {
    if (!element) return null;

    const rect = element.getBoundingClientRect();

    return [
      { x: rect.left + rect.width / 2, y: rect.top },
      { x: rect.right, y: rect.top + rect.height / 2 },
      { x: rect.left + rect.width / 2, y: rect.bottom },
      { x: rect.left, y: rect.top + rect.height / 2 },
    ];
  };

  const getValue = () => {
    return element?.value;
  };

  return { element, getPoints, getValue };
};
