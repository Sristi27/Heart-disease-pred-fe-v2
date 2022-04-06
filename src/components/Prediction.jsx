import React from 'react'
import { errorData, NoRiskData, RiskData } from '../utils/resultData';
import { urlList } from '../utils/urlLinks';
import Form from './Form';

const Prediction = ({ setOpenDialog,setOpen,setResult}) => {
 
    const createForm = (formData,values) => { 
        formData.append("age", values.age);
        formData.append("sex", values.sex);
        formData.append("cp", values.chestPainType);
        formData.append("trestbps", values.restingBloodPressure);
        formData.append("chol", values.cholestrol);
        formData.append("fbs", values.fastingBloodSugar);
        formData.append("restecg", values.ecg);
        formData.append("thalach", values.heartRate);
        formData.append("exang", values.angina); 
        formData.append("oldpeak", 2.3); 
        formData.append("slope", 0); 
        formData.append("ca", 0); 
        formData.append("thal", values.thal);
    }

    const medCheckupData = (values,result) => JSON.stringify({
        email:JSON.parse(localStorage.getItem('loginData')).email,
        age:values.age,
        sex:values.sex,
        chestPainType:values.chestPainType,
        pressure:values.restingBloodPressure,
        cholestrol:values.cholestrol,
        sugar:values.fastingBloodSugar,
        ecg:values.ecg,
        heartRate:values.heartRate,
        angina:values.angina,
        thal:values.thal,
        result:result
    });

    const handleSubmit = (values) => { 
        
        for (let key in values) {
          if (values[key] == "") {
            alert("Please fill all the fields!");
            return false;
          }
        }
        setOpen(true); //loading = true
        setOpenDialog(false);
        var formData = new FormData(); 
        createForm(formData,values); // form created

        fetch(urlList.predictUrl, {
          method: "POST",
          body: formData
        })
          .then((res) => res.json())
          .then(async (res) => {
            console.log(res);
            setOpenDialog(true); //prediction dialog
            if (res.value == "Yes") {  
              setResult(RiskData); 
            } else if (res.value == "No") { 
                setResult(NoRiskData);
            } 
            await fetch(urlList.saveMedUrl,{
                method:'POST',
                body:medCheckupData(values,res.value),
                headers: {
                    'Content-Type': 'application/json',
                  },
            }).then(res=>res.json())
            .then(res=>{
              console.log(res);
            })
            .catch(err=>alert('Error'))
          })
          .catch((err) => {
            alert(errorData);
            setOpen(false);
          })
          .finally(()=>{
              setOpen(false)
            });
      };

  return (
    <Form submitFn={handleSubmit}/>
  )
}

export default Prediction