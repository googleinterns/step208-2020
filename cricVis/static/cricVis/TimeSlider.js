class TimeSlider{
  constructor(carouselID, chartDivID, sliderIDNumber, chartData){
    this.carouselID = carouselID;
    this.chartDivID = chartDivID;
    this.sliderIDNumber = sliderIDNumber;
    this.chartData = chartData;
  }
  createHTMLElement(elementType, elementID, elementClass){
    let element = document.createElement(elementType);
    element.id = elementID;
    element.classList.add(elementClass);
    return element;
  }
}