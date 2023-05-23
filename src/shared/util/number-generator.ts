let id = 0;

export function* generateUniquieId() {
  while (true) {
    id += 1;
    yield id;
  }
}

const x = generateUniquieId();
export function getId() {
  return x.next().value;
}
