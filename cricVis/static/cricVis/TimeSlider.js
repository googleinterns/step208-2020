class TimeSlider{
  constructor(carouselID, chartDivID, sliderIDNumber, chartData){
    this.carouselID = carouselID;
    this.chartDivID = chartDivID;
    this.sliderIDNumber = sliderIDNumber;
    this.chartData = chartData;
    this.dateList = this.createDateList(this.chartData["chartDataResponse"]);
    this.sliderID = `timeSlider${this.sliderIDNumber}`;
    this.sliderBubbleID = `timeSliderValueBubble${this.sliderIDNumber}`;
    this.createTimeSlider();
  }
  createDateList(chartDataResponse){
    let dateList = [];
    Object.keys(chartDataResponse).forEach(function(date){
      dateList.push(date);
    });
    dateList.sort();
    return dateList;
  }
  createTimeSlider(){
    const sliderElement = this.createHTMLElement("input", `timeSlider${this.sliderIDNumber}`, "timeSlider");
    const sliderBubble = this.createHTMLElement("span", `timeSliderValueBubble${this.sliderIDNumber}`, "timeSliderValueBubble");
    let sliderContainer = this.createHTMLElement("div", `timeSliderContainer${this.sliderIDNumber}`, "timeSliderContainer");
    sliderContainer.appendChild(sliderBubble);
    sliderContainer.appendChild(sliderElement);
    document.getElementById(this.carouselID).appendChild(sliderContainer);
    this.enableSlider()
  }
  createHTMLElement(elementType, elementID, elementClass){
    let element = document.createElement(elementType);
    element.id = elementID;
    element.classList.add(elementClass);
    return element;
  }
  enableSlider(){
    const rangeMax = (this.dateList.length - 1) * 5;
    document.getElementById(this.sliderID).max = rangeMax.toString();
    document.getElementById(this.sliderBubbleID).innerHTML = this.dateList[0];
    this.useSlider();
  }
  useSlider(){
    const classObject = this;
    $(classObject.sliderID).on('input', function() {
      const currentPositionSlider = $(this).val();
      const portion = (currentPositionSlider) / ($(this).attr('max'));
      $(classObject.sliderBubbleID).text(classObject.dateList[currentPositionSlider / 5]);
      $(classObject.sliderBubbleID).css('left', portion * $(classObject.sliderID).width());
    });
  } 
}