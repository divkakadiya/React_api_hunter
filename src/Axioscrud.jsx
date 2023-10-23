import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Axioscrud = () => {
    const [pdata, setPdata] = useState([])
    const [gdata, setGdata] = useState([])
    const [esignal, setEsignal] = useState(false)
    const [edata, setEdata] = useState([])

    const url = 'http://localhost:3030/userDetails'

    const fetchInput = (e) => {
        setPdata({ ...pdata, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        axios.post(url, pdata).then(res => {
            setGdata([...gdata, res.data] || [])
        })

        setPdata({
            userName: '',
            userEmail: ''
        })
    }

    const handleEdit = (id) => {
        const fd = gdata[id]
        setEdata(fd)
        setEsignal(true)
    }

    const fetchEdit = (e) => {
        setEdata({ ...edata, [e.target.name]: e.target.value })
    }

    const handleUpdate = (id) => {
        axios.put(`${url}/${id}`, edata).then((res) => {
            setGdata(data => data.map(v => v.id == id ? edata : v))
        })

        setEdata({
            userName: '',
            userEmail: ''
        })
        setEsignal(false)
    }

    const removeData = (id) => {
        axios.delete(`${url}/${id}`)
        setGdata(gdata.filter(v => v.id !== id))
    }

    useEffect(() => {
        axios.get(url).then(res => {
            setGdata(res.data)
        })
    }, [])

    return (
        <>
            {esignal ? (
                <>
                    <h2>Update Axios</h2>
                    <label>NAME</label><br />
                    <input type='text' name='userName' value={edata.userName} onChange={fetchEdit} placeholder='Your name' /><br />

                    <label>EMAIL</label><br />
                    <input type='email' name='userEmail' value={edata.userEmail} onChange={fetchEdit} placeholder='Your email' /><br />

                    <button type='submit' onClick={() => handleUpdate(edata.id)}>Update</button>
                </>
            ) : (
                <>
                    <h2>Registration Axios</h2>
                    <label>NAME</label><br />
                    <input type='text' name='userName' value={pdata.userName} onChange={fetchInput} placeholder='Your name' /><br />

                    <label>EMAIL</label><br />
                    <input type='email' name='userEmail' value={pdata.userEmail} onChange={fetchInput} placeholder='Your email' /><br />

                    <button type='submit' onClick={handleSubmit}>Submit</button>
                </>
            )}

            <table border={1} style={{ margin: '1vw auto 0' }}>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ACTION</th>
                    </tr>

                    {
                        gdata.map((v, i) =>
                            <tr key={i}>
                                <td>{v.id}</td>
                                <td>{v.userName}</td>
                                <td>{v.userEmail}</td>
                                <td>
                                    <button onClick={() => handleEdit(i)}>Edit</button>
                                    ||
                                    <button onClick={() => removeData(v.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </ table>
        </>

    )
}

export default Axioscrud