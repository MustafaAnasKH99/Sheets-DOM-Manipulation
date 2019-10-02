//Grab locally stored values
const data = localStorage.getItem('data');
const table = document.getElementById('table')
const export_excel_button = document.getElementsByClassName('export-excel');

const saveData = () => {
    let fName = document.getElementById('fname').value
    let lName = document.getElementById('lname').value
    let DoB = document.getElementById('birth').value

    let fetchedData = []
    let values = {
        fName: fName,
        lName: lName,
        DoB: DoB,
    }

    if(data === null){
        // Save new data to the localStorage

        fetchedData.push(values)
        dataFinal = JSON.stringify(fetchedData)
        localStorage.setItem('data', dataFinal)

        // Save new data to the dom
        
        let tr = document.createElement('tr')
        let td1 = document.createElement('td');
        let txt1 = document.createTextNode(values.fName)
        td1.appendChild(txt1)
        tr.appendChild(td1)
        let td2 = document.createElement('td');
        let txt2 = document.createTextNode(values.lName)
        td2.appendChild(txt2)
        tr.appendChild(td2)
        let td3 = document.createElement('td');
        let txt3 = document.createTextNode(values.DoB)
        td3.appendChild(txt3)
        tr.appendChild(td3)
        table.appendChild(tr)
    } else {
        // Save new data to the localStorage

        let data = localStorage.getItem('data')
        let finalData = JSON.parse(data)
        fetchedData = [...finalData];
        fetchedData.push(values)
        let pushFinalData = JSON.stringify(fetchedData)
        localStorage.setItem('data', pushFinalData)

        // Save new data to the dom

        let tr = document.createElement('tr')
        let td1 = document.createElement('td');
        let txt1 = document.createTextNode(values.fName)
        td1.appendChild(txt1)
        tr.appendChild(td1)
        let td2 = document.createElement('td');
        let txt2 = document.createTextNode(values.lName)
        td2.appendChild(txt2)
        tr.appendChild(td2)
        let td3 = document.createElement('td');
        let txt3 = document.createTextNode(values.DoB)
        td3.appendChild(txt3)
        tr.appendChild(td3)
        table.appendChild(tr)
    }

    
}

document.getElementById('excel-file').addEventListener('change', async (e) => {
    let reader = await new FileReader();
    reader.readAsArrayBuffer(e.target.files[0])
    reader.onload = async (e) => {
        let data = await new Uint8Array(reader.result)
        let web = await XLSX.read(data, {type: 'array'})
        let html_string = await XLSX.write(web, {Sheet: 'sheet no1', type: 'binary', bookType: 'html'})
        
        let div = document.createElement('div')
        div.innerHTML = html_string
        table.appendChild(div)

        let td = document.getElementsByTagName('td');
        let tr = document.getElementsByTagName('tr');

        let td_array = Array.from(td)
        let tr_array = Array.from(tr)
        let new_data_array = [];

        await tr_array.forEach(e => {
            let td_collection = Array.from(e.children)
            
            let first_name = td_collection[0].innerHTML
            let last_name = td_collection[1].innerHTML
            let date_of_birth = td_collection[2].innerHTML

            let push_object = {
                fName: first_name,
                lName: last_name,
                DoB: date_of_birth
            };
            new_data_array.push(push_object)
        })
        let push_array = await JSON.stringify(new_data_array)
        localStorage.setItem('data', push_array)
        
        await td_array.forEach(async (e) => {
            await e.addEventListener('click', function(e){
                deleteFunction(e.target)
            })
        })        
    }
})

const deleteFunction = (val) => {
    val.parentElement.remove()

    let data_again = localStorage.getItem('data');
    let fetchedDtata = JSON.parse(data_again);
    let finalData = []
    fetchedDtata.forEach(e => {
        if (e.fName === val.firstChild.data || e.lName === val.firstChild.data || e.DoB === val.firstChild.data){
            console.log('this is it')
        } else {
            finalData.push(e)
        }
    })
    dataFinal = JSON.stringify(finalData)
    localStorage.setItem('data', dataFinal)

}

const fetchData = () => {
    if (data !== null){
        let fetchedDtata = JSON.parse(data)
        fetchedDtata.forEach(element => {
            let table = document.getElementById('table')
            let tr = document.createElement('tr')
            let td1 = document.createElement('td');
            let txt1 = document.createTextNode(element.fName)
            td1.appendChild(txt1)

            let td2 = document.createElement('td');
            let txt2 = document.createTextNode(element.lName)
            td2.appendChild(txt2)

            let td3 = document.createElement('td');
            let txt3 = document.createTextNode(element.DoB)
            td3.appendChild(txt3)

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            let randomClassName =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            tr.classList.add(randomClassName);
            tr.addEventListener('click', (e) => {
                deleteFunction(e.target)
            })
            table.appendChild(tr)
        });
    }
    return;
}

fetchData()


export_excel_button[0].addEventListener('click', async (e) => {
    let table = document.getElementById('table')
    let web = await XLSX.utils.table_to_book(table, {Sheet: 'Sheet JS'})
    let excel_file = XLSX.write(web, {bookType: 'xlsx', bookSST: true, type: 'binary'})
    let final = await XLSX.writeFile(web, 'sheetjs.xlsx')
})