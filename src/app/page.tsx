"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Cursor from "./components/Cursor";
import Experience from "./components/Experience";
import { experiences, skills } from "./data/data";
import PreLoader from "./components/PreLoader";
import { useState } from "react";
export default function Home() {
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <>
      <Cursor isPreloading={isPreloading} />
      {isPreloading && <PreLoader setIsPreloading={setIsPreloading} />}
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.broad}>
            <div className={styles.avatar}>
              <img src="/me.jpg" alt="Avatar" />
            </div>
            <div className={styles.avatarTitle}>
              <h1>Omar Taheri.</h1>
              <h2>CS Student</h2>
            </div>

            <div className={styles.contactInfo}>
              <p>
                <img src="email.svg" alt="Email Logo" />
                <a href="mailto:O.Taheri@aui.ma">O.Taheri@aui.ma</a>
              </p>
              <p>
                <img src="phone.svg" alt="Phone Logo" />
                +212 606906126
              </p>
              <p>
                <img src="github.svg" alt="Phone Logo" />
                <a href="https://github.com/OmarTaheri">OmarTaheri</a>
              </p>
              <p>
                <img src="dribbble.svg" alt="Phone Logo" />
                <a href="https://dribbble.com/OmarTaheri">OmarTaheri</a>
              </p>
            </div>
            <div className="section">
              <h2>About me</h2>
              <p>
                I am a computer science student at Al Akhawayn University in
                Ifrane, Morocco. I am passionate about software development and
                data science. I am currently looking for an internship to
                develop my skills and gain experience.
              </p>
            </div>
            <div className={styles.skills}>
              <h2>Skills</h2>
              <div>
                {skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </div>
            <div className={styles.qrcode}>
              <h2>QR code</h2>
              <div>
                <Image src="/qr.png" alt="QR code" width={120} height={120} />
              </div>
            </div>
          </div>
          <div className={styles.experiences}>
            <h2>Experiences.</h2>
            {experiences.map((experience) => (
              <Experience
                key={experience.id}
                title={experience.title}
                date={experience.startDate}
                description={experience.description}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
