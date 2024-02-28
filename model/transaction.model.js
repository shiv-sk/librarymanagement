const mongoose = require("mongoose");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

const TransactionSchema = new mongoose.Schema({
    borroweduser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    borrowedbook:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },
    checkoutdate:{
        type:Date,
        default:Date.now
    },
    duedate:{
        type:Date
    }
},{timestamps:true})

TransactionSchema.pre("save" , function(next){
    this.duedate = new Date(this.checkoutdate.getTime() + 20*24*60*60*1000)
    next();
});


async function sendRemainderEmail(borrowed_user_email, book_title, due_date){
    const transporter = nodemailer.createTransport({
        service:"gamil",
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.EMAIL_PASS
        }
    })
    const mailoptions = {
        from:process.env.USER_EMAIL,
        to:(this.borroweduser).email,
        subject:`Reminder: Please return the book ${book_title} by ${due_date}`,
        text:`Hello,

        This is a friendly reminder that you have borrowed the book ${book_title} from our library and the due date is ${due_date}. 
        Please return the book as soon as possible to avoid any late fees.
        
        Thank you for using our service.
        
        Sincerely,
        The Library Team`,
    }
    try {
        await transporter.sendMail(mailoptions);
        console.log("email sent succesfully!");
    } catch (error) {
        console.error("error in sending email: " , error)
    }
}

const remainder = cron.schedule("0 0 9 * * 1" , ()=>{
    sendRemainderEmail(borrowed_user_email, book_title, due_date)
});

//adding mailsending for duedate functionality using node-corn
TransactionSchema.pre("save", async function (next) {
    // Only run this middleware if this is a new document
    if (this.isNew) {
      // Get the borrowed user email, book title, and due date from the document
      const borrowed_user_email = await User.findById(this.borroweduser).email;
      const book_title = await Book.findById(this.borrowedbook).title;
      const due_date = this.duedate;
  
      // Create a cron job using the sendReminderEmail function
      // Schedule it to run one week before the due date at 9 am
      // You can change the cron expression according to your needs
      const cron_job = cron.schedule(
        `0 9 ${due_date.getDate() - 7} ${due_date.getMonth() + 1} *`,
        () => {
          sendRemainderEmail(borrowed_user_email, book_title, due_date);
        }
      );
  
      // Store the cron job id in the document
      this.cronjob = cron_job.id;
    }
    next();
  });




const Transaction = mongoose.model("Transaction" , TransactionSchema)
module.exports = Transaction