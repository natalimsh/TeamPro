// src/pages/HomePage.js
import React from 'react';
import TeamSection from '../components/TeamSection'; // Імпортуємо TeamSection
import ContactForm from '../components/ContactForm'; // Імпортуємо ContactForm

/**
 * HomePage Component
 * Цей компонент слугує головною сторінкою додатку,
 * яка містить секцію команди та контактну форму.
 */
function HomePage() {
  return (
    <>
      {/* Секція команди */}
      <TeamSection />

      {/* Секція контактної форми */}
      <ContactForm />

      {/* Тут можуть бути інші секції вашої головної сторінки */}
      {/* Наприклад:
      <section id="services" className="services-section">
        <div className="container">
          <h2>Наші Послуги</h2>
          <p>Ми пропонуємо широкий спектр послуг...</p>
        </div>
      </section>
      */}
    </>
  );
}

export default HomePage;
