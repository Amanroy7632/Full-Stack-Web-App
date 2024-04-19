const nodemail=require("nodemailer")
const emailjs =require("@emailjs/browser")
const sendEmail=async({toEmail,subject,code,content})=>{
//   const transpotar=nodemail.createTransport(
//     {
//     host:"smtp.gmail.com",
//     port:587,
//     secure:false,
//     auth:{
//         user:"",
//         pass:""
//     }
//   })
      
  const message={
    user_email:toEmail,
    subject,
    html:`<div>
    <h3>${content}</h3>
    <p>${code}</p>
    </div>`
  }
  emailjs
      .send('service_hkvbkra', 'template_ua0hwpn', message, {
        publicKey: '20qu55NKpDz2aMPlK',
      })
      .then(
        (response) => {
          // alert("Message Sent Successfully !");
           console.log("Verification code sent successfully");
        //   toast.success("Message Sent Successfully")
        },
        (error) => {
          console.log("Something Went wrong !!");
          console.log(error);
        },
      );
//   await transpotar.sendMail(message)
}
module.exports=sendEmail