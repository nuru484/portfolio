import { Github, Mail, Linkedin, FileText, ExternalLink } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="#"
              className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">abdulmajeednurudeen48@gmail.com</p>
            </a>
            <a
              href="#"
              className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <Github className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800">GitHub</h3>
              <p className="text-gray-600">Abdul-Majeed Nurudeen</p>
            </a>
            <a
              href="#"
              className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <Linkedin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800">LinkedIn</h3>
              <p className="text-gray-600">Abdul-Majeed Nurudeen</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
