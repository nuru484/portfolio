import ContactForm from '../components/ContactForm';
import NavBar from '../components/NavBar';
import { BottomBar } from '../components/Footer';

const ContactPage = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-gray-100">
        <ContactForm />
      </div>
      <BottomBar />
    </div>
  );
};

export default ContactPage;
