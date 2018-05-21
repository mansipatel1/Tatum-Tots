class App {
    constructor(selectors) {
      this.flicks = [];
      this.max = 0;
      this.list = document.querySelector(selectors.listSelector);
      this.template = document.querySelector(selectors.templateSelector);
  
      document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', ev => {
          ev.preventDefault();
          this.handleSubmit(ev);
        })
    }
    
    removeFlick(flick, ev) {
        //remove from the DOM
        const item = ev.target.closest('.flick'); 
        item.remove();
        const i = this.flicks.indexOf(flick); //search for index in the array
        this.flicks.splice(i, 1); //spliced at that index with array.splice

      }

    renderListItem(flick) {
      const item = this.template.cloneNode(true);
      item.classList.remove('template');
      item.dataset.id = flick.id;
      item
        .querySelector('.flickName')
        .textContent = flick.name;

        item
        .querySelector('.remove.button')
        .addEventListener('click',this.removeFlick.bind(this, flick))

      return item
    }

  
    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }
    
        this.flicks.unshift(flick)
    
        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)
    
        f.reset()
        }
  }
  
  const app = new App();

  app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
  })