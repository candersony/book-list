/**
 * Created by Craig on 06/02/2016.
 */

class SearchView {
  constructor({ inputElement, bookController, defaultValue}){
    this.inputElelemnt = inputElement;
    this.bookController = bookController

    this.inputElelemnt.oninput = this.onInput.bind(this);

    if(!!defaultValue) {
      this.inputElelemnt.value = defaultValue;
      this.onInput();
    }
  }

  onInput(){
    let searchTerm = this.inputElelemnt.value;
    this.bookController.searchBooks({ query: searchTerm});
  }
}

export default SearchView
