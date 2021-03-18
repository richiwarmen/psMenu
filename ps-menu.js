
psMenu = {
    addIcoBlock : function(){
    let psIcoElement = document.createElement('div');
        psIcoElement.style.minWidth = '17px';
       // psIcoElement.style.maxWidth = '16px';
      //  psIcoElement.style.minHeight = '16px';
      //  psIcoElement.style.maxHeight = '16px';
        psIcoElement.style.textAlign= 'center';
        psIcoElement.style.verticalAlign= 'middle';
       // psIcoElement.style.lineHeight= '14px';
       // psIcoElement.style.marginTop = '1px';
        psIcoElement.style.position = 'absolute';
        psIcoElement.style.display = 'inline-block';
        psIcoElement.style.cursor = 'pointer';
    return psIcoElement;
} ,
    // add row
    addItem : function(layerText='',layerData={}, callbackReorder){

        // Eye icon
        let eye = this.addIcoBlock();
            eye.innerHTML = '<span>&#128065;</span>';
            eye.className='eye';
            eye.style.borderRight = '#424242';
            eye.style.borderRightStyle= 'solid';
            eye.style.borderRightWidth= '1px';
            eye.addEventListener('mouseup',eyeClick);

        // Lock icon
        let lock = this.addIcoBlock();
            lock.style.right='2px';
            lock.innerHTML = '<span>&#128275;</span>';
            lock.className = 'locked';
            lock.style.borderLeft = '#424242';
            lock.style.borderLeftStyle= 'solid';
            lock.style.borderLeftWidth= '1px';
            lock.addEventListener("mouseup", lockClick);

        // Edit icon
        let edit = this.addIcoBlock();
            edit.style.right='22px';
            edit.innerHTML = '<span>&#10004;</span>';
            edit.className = 'edit';
            edit.style.borderLeft = '#424242';
            edit.style.borderLeftStyle= 'solid';
            edit.style.borderLeftWidth= '1px';
            edit.style.display = 'none';
            edit.style.color = '#5eff5e';
            edit.addEventListener("mouseup", editLayer);

        // Text content
        let textContent = document.createElement('div');
            textContent.style.display = 'block';
            textContent.style.backgroundColor = "#535353";
            textContent.textContent = layerText;
            textContent.style.width='-webkit-fill-available';
            textContent.style.marginLeft = '17px';
            textContent.style.paddingLeft = '3px';
            textContent.style.clear = 'both';
            textContent.style.minHeight='16px';
            textContent.className='ps-text-layer';
            textContent.addEventListener("dblclick", editText);

        // Text editable input
        let editableInput = document.createElement("input");
            editableInput.style.fontSize='11px';
            editableInput.style.backgroundColor = '#424242';
            editableInput.style.color='#fff';
            editableInput.style.marginLeft = '18px';
            editableInput.type = 'hidden';
            editableInput.style.borderWidth='0px';
            editableInput.borderStyle='solid';
            editableInput.className='ps-editable-input';
            editableInput.style.fontFamily = '-webkit-pictograph';
            editableInput.style.width='-webkit-fill-available';
            editableInput.style.marginRight='40px';
            editableInput.style.marginTop= '1px';
            editableInput.addEventListener("keyup", checkKeyEventsInput);

        // container for Text content and Text editable input
        let contentContainer = document.createElement('div');
            contentContainer.append(editableInput);
            contentContainer.append(textContent);

        // Set data attribute
        let attributeData = document.createAttribute('ps-data');
            attributeData.value = JSON.stringify(layerData);

        let layerId = document.createAttribute('id');
            layerId.value = 'layer_'+itemCount;

        let menuLayer = document.createElement('li');
            menuLayer.attributes.setNamedItem(attributeData);
            menuLayer.attributes.setNamedItem(layerId);
            menuLayer.style.backgroundColor = '#424242';
            menuLayer.style.paddingTop = '1px';
            menuLayer.draggable = true;
            menuLayer.append(eye);
            menuLayer.append(lock);
            menuLayer.append(edit);
            menuLayer.append(contentContainer);
            menuLayer.addEventListener('dragover', dragover);
            menuLayer.addEventListener('drop', drop);
            menuLayer.addEventListener('dragstart', dragstart);
            menuLayer.addEventListener('dragleave', dragleave);
            menuLayer.addEventListener('mouseup', menuLayerMouseup);
            psContainer.ondragover='allowDrop(event)';
            psContainer.prepend(menuLayer);

        itemCount+=1;

        function lockClick(event){
            // TODO
            console.log('lock click');
        }
        function eyeClick(event){
            // TODO
            console.log('eye click');
        }

        function editLayer(event){
            let input = this.parentElement.getElementsByClassName('ps-editable-input')[0];
            let label = this.parentElement.getElementsByClassName('ps-text-layer')[0];
            let edit =  this.parentElement.getElementsByClassName('edit')[0];
            edit.style.display='none';
            //input.value =  label.innerText;
            input.type = 'hidden';
            label.style.display='';
            label.innerText = input.value;
        }

        function checkKeyEventsInput(e){
            if (e.key === "Escape") { // escape key maps to keycode `27`
                let input = this;
                let label = this.parentElement.getElementsByClassName('ps-text-layer')[0];
                let edit =  this.parentElement.parentElement.getElementsByClassName('edit')[0]
                edit.style.display='none';
                input.type = 'hidden';
                label.style.display='';

            }
        }

        function dragstart(ev) {
            ev.dataTransfer.setData('text/plain',ev.target.id);
        }
        function dragover(ev) {
            ev.preventDefault();

            this.style.backgroundColor = '#9eeaf6';
            ev.dataTransfer.dropEffect = "move";
            target =  ev.target.closest("li");
        }
        function dragleave(ev) {
            this.style.backgroundColor = '';
        }
        function drop(ev) {
           ev.preventDefault();
           ev.stopPropagation();
           target = ev.target.parentElement;
            var menuEl = document.getElementsByTagName('ol')[0];
            let sourceEl = document.getElementById(ev.dataTransfer.getData('text/plain'));
            menuEl.insertBefore(sourceEl, ev.target.closest("li"));
            this.style.backgroundColor = '';
            if(callbackReorder) callbackReorder(this.getAttribute('ps-data'));
        }
        function menuLayerMouseup(ev) {
            this.style.backgroundColor = '';
        }
        function editText(ev) {
            document.querySelectorAll('.edit > input').forEach(function(el) {
                console.log(el);
                el.style.display = 'none';
            });

            let input = this.parentElement.getElementsByClassName('ps-editable-input')[0];
            let label = this;
            let edit = this.parentElement.parentElement.getElementsByClassName('edit')[0];
            edit.style.display='';
            input.value =  label.innerText;
            input.type = 'text';
            label.style.display='none';
            input.focus();
        }
     },
    count: function(){
            return itemCount;
        },
    render(){
            document.head.insertAdjacentHTML("beforeend", `<style>
           .edit{
            background-color: #535353;
            }
            .edit:hover{
            background-color: #1e8fe7;
            }
            .locked{
            background-color: transparent;
            }
            .locked:hover{
            background-color: #f4201c;
            }
            .eye{
            background-color: #535353;
            }
            .eye:hover{
            color: #f4201c;
            }
    
            </style>`);
            if(this.count()) return psContainer;
    }
}
let itemCount = 0 ;
let psContainer= document.createElement('ol');
    psContainer.style.backgroundColor = "#424242";
    psContainer.style.color= '#f0f0f0';
    psContainer.style.minWidth = '268px';
    psContainer.style.lineHeight = '1.8';
    psContainer.style.fontFamily = '-webkit-pictograph';
    psContainer.style.setProperty("-moz-user-select", "none");
    psContainer.style.setProperty("-khtml-user-select", "none");
    psContainer.style.setProperty("-webkit-user-select", "none");
    psContainer.style.listStyle = 'none';
    psContainer.style.margin = '0';
    psContainer.style.padding='0';


