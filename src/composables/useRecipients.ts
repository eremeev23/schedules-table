export const useRecipients = (arr: string[]): string => {
  switch (arr.length) {
    case 1:
      return `#${arr[0]}`;
    case 2:
      return `#${arr[0]}, #${arr[1]}`;
    case 3:
      return `#${arr[0]}, #${arr[1]}, #${arr[2]}`;
    default:
      return `#${arr[0]}, #${arr[1]}, #${arr[2]}...`;
  }
}
