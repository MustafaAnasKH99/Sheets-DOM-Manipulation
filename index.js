//Grab locally stored values
const data = localStorage.getItem('data');
const table = document.getElementById('table')

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

        // Save new data to the localStorage

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
    console.log(reader)
    reader.readAsArrayBuffer(e.target.files[0])
    reader.onload = async (e) => {
        console.log('reader???')
        let data = await new Uint8Array(reader.result)
        let web = await XLSX.read(data, {type: 'array'})
        let html_string = await XLSX.write(web, {Sheet: 'sheet no1', type: 'binary', bookType: 'html'})
        console.log(html_string)
        
        let div = document.createElement('div')
        div.innerHTML = html_string
        table.appendChild(div)

        let td = document.getElementsByTagName('td');

        let smthElse = Array.from(td)
        await smthElse.forEach(async (e) => {
            await e.addEventListener('click', function(e){
                console.log('yup you clicked one')
                deleteFunction(e.target)
            })

        })
        
    }
})

const deleteFunction = (val) => {
    val.parentElement.remove()
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