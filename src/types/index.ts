type Creator = {
  id: number;
  name: string;
}

export type Schedule = {
  title: string;
  creator: Creator;
  trigger: string;
  recipients: string[];
  interval: string;
  next_delivery: string;
}

export type HashTable = {
  [key: string]: Schedule[]
}

export type Tab = {
  title: string;
  value: string;
  quantity: number;
}
