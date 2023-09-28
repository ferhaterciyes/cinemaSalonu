const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.reserved)");
const select = document.querySelector("#movies");
const count = document.querySelector(".count");
const amount = document.querySelector(".amount");
const title = document.querySelector("p");
// console.log(seats);
//* veritabanı fonksiyonu
const saveToDataBase = (seatIndex) => {
  // console.log(seatIndex);
  //*veritabanı 'localstorage' kayıt için set kullanılıyor

  //* koltukların verisi kaydetme
  localStorage.setItem("user", JSON.stringify(seatIndex));

  //* film verisi kaydı
  localStorage.setItem("movieIndex", JSON.stringify(select.selectedIndex));
  console.log();
};
const getFromDataBase = () => {
  let dbSelectedSeatsIndex = JSON.parse(localStorage.getItem("user"));
  //   console.log(dbSelectedSeatsIndex);
  if (dbSelectedSeatsIndex !== null && dbSelectedSeatsIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeatsIndex.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  select.selectedIndex = dbSelectedMovie;
};

getFromDataBase();

//** hesaplama ve koltuk bilgileri tespit fonksiyonu */

const calculateTotal = () => {
  /* -------- veritabanı işlemleri------------- */

  //* önce tüm boş koldukların olduğu diziyi aldım
  let allSeatArray = [];
  seats.forEach((seat) => {
    allSeatArray.push(seat);
  });
  // console.log(allSeatArray);
  //*seçili koltuklardan oluşacak diziyi tanımlıyoruz

  let allSelectedSeatsArray = [];
  let allSelectedSeats = container.querySelectorAll(".selected");
  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  }); // console.log(allSelectedSeatsArray);

  const selectedSeatIndex = allSelectedSeatsArray.map((selectedSeat) => {
    const compareSeat = allSeatArray.indexOf(selectedSeat);
    // console.log(compareSeat);
    return compareSeat;
  });
  // console.log(selectedSeatIndex);

  /*  Hesaplama İşlemleri 
    ----------------------------------------
    */
  //* toplam secili koltuk sayısı
  let selectedSeatsCount = container.querySelectorAll(".selected").length;
  //  console.log(selectedSeatsCount);

  //* toplam seçili koltuk sayısını count değişkenine atadık
  count.innerText = selectedSeatsCount;
  //* toplam secili price ı amount değişkenine atadık
  amount.innerText = selectedSeatsCount * select.value;

  //* eğer seçilen koltuk 0 ise
  if (selectedSeatsCount) {
    //* p tagine css de görünmesi için hazırladığım open class ını ekle
    title.classList.add("open");
  } else {
    //*  boşsa bırak kalsın görünmesin
    title.classList.remove("open");
  }
  saveToDataBase(selectedSeatIndex);
};
calculateTotal();

/* evens */

container.addEventListener("click", (e) => {
  /* koltuüu seçmek için click eventi ekledik */
  const clickedSeat = e.target.offsetParent;
  /* tıklama eventi ile koltuk tespiti */

  // console.log(clickedSeat);
  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
    calculateTotal();
  }
});
select.addEventListener("change", () => {
  calculateTotal();
});
