module.exports = {
  saat: [0, 1, 2, 3],
  // Hours, hours + minutes + geçiyor => 100 + hour
  1: [11, 12, 13], // bir
  101: [11, 12, 13, 14], // biri
  2: [22, 23, 24], // iki
  102: [22, 23, 24, 25, 26], // ikiyi
  3: [8, 9], // üç
  103: [8, 9, 10], // üçü
  4: [55, 56, 57, 58], // dört
  104: [33, 34, 35, 36, 37], // dördü
  5: [62, 63, 64], // beş
  105: [62, 63, 64, 65], // beşi
  6: [15, 16, 17, 18], // altı
  106: [15, 16, 17, 18, 19, 20], // altıyı
  7: [38, 39, 40, 41], // yedi
  107: [38, 39, 40, 41, 42, 43], // yediyi
  8: [44, 45, 46, 47, 48], // sekiz
  108: [44, 45, 46, 47, 48, 49], // sekizi
  9: [27, 28, 29, 30, 31], // dokuz
  109: [27, 28, 29, 30, 31, 32], // dokuzu
  10: [5, 6], // on
  110: [5, 6, 7], //onu

  // Minutes
  beş: [99, 100, 101], // 5
  on: [81, 82], // 10
  yirmi: [83, 84, 85, 86, 87], // 20
  otuz: [69, 70, 71, 72], // 30 
  kırk: [73, 74, 75, 76], // 40
  elli: [77, 78, 79, 80], // 50

  // Special words
  yarım: [50, 51, 52, 53, 54], // 00:30 and 12:30 !!
  buçuk: [88, 89, 90, 91, 92], // half past
  çeyrek: [93, 94, 95, 96, 97, 98], // quarter past
  geçiyor: [103, 104, 105, 106, 107, 108, 109], // passes/after
};
