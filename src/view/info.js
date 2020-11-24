export const createInfo = function (events) {

  const getTotlaPrice = () => {
    let totalPrice = 0;
    for (const event of events) {
      totalPrice += event.price;
      event.offers.forEach((offer) => {
        totalPrice += offer.price;
      });
    }
    return totalPrice;
  };

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotlaPrice()}</span>
      </p>
    </section>
  `;
};
