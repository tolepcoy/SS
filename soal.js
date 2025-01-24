let questions = [
  { question: "1. <b>SOAL NO. 1</b><hr>Si Jepri mempunyai 4 buah Apel, kemudian Jepri memakan 3 buah Apel miliknya.<br>Di karenakan lapar, lalu Jepri memakan Apel yang ke-4 tetapi tidak sampai habis dan menyisakan 30% dari Apel tersebut.<br>Jika nilai 100% adalah total dari seluruh Apel termasuk yang telah di makan Jepri, maka berapa persenkah Apel yang telah dimakan Jepri?",
  answer: "92.5%" },

  { question: "2. <b>SOAL NO. 2</b><hr>Seorang Raja berbeda dengan seorang Putri. Dan Putri tidak slalunya adalah anak dari seorang Raja, sedangkan Raja tidak selalu mempunyai Putri.<br>Dari tulisan saya ini ada sebuah huruf yang hilang, huruf apakah itu?",
  answer: "e" },

  { question: "3. <b>SOAL NO. 3</b><hr>Apa ibu kota negara Jepang jika Amerika Serikat tidak membom Atom kota Nagasaki dan Hiroshima pada Perang Dunia ke-II?",
  answer: "Tokyo" },

  { question: "4. <b>SOAL NO. 4</b><hr>Huruf yang ada di tengah kata '<span class='quotE'>Komputer</span>'?",
  answer: "pu" },

  { question: "5. <b>SOAL NO. 5</b><hr>Jika lagu '<span class='quotE'>Ibu Kita Kartini</span>' diciptakan oleh suaminya sendiri,<br>maka suaminya adalah seorang?",
  answer: "Laki-laki" },

  { question: "6. <b>SOAL NO. 6</b><hr>Manusia tidak bisa bernafas di dalam air, jikalau ada orang yang mengatakan ia mampu bernafas di dalam air maka ia disebut pembohong.<br>Anonim dari kata pembohong ini mirip sebuah judul lagu, apa nama Band tersebut?",
  answer: "Radja" },
      
  { question: "7. <b>SOAL NO. 7</b><hr>Silahkan Ente jawab <br>'<span class='quotE'>Iya atau Bukan saja</span>' dari pertanyaan berikut ini :<br>Apakah '<span class='quotE'>Tingwe</span>' adalah salah satu merek rokok kretek?",
  answer: "Iya atau Bukan saja" },
  
  { question: "8. <b>SOAL NO. 8</b><hr><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAAoCAYAAAAYEYTzAAAQdElEQVR4Xu1dCbAdRRW97rvlAi64r0gQXIiipWIJKu4BAQUXwKXcQIoqIYIFBlEkQBQIqwIiCUshkkigILKUkYBsQYkkLBKNBE1SmAhZSPLz34zec+/c6Zl+M/Pm/Z/M/Jn/5lfX+9PT03379O0zt2/39BANjgECAwQGCHQhcBw9iebRU2oNv6Enp+QaCzJBhuQBGevGyW+8uuVB+f5Rt0y+LkG+sSbTWNRvvx0H5wMEBgiMZwTsCbiZdqSQLuIwm8PvOFxVUUBZszhcQh2aJE2xgJ4qvx36KMdfHF2vWibgMIM20ztTMgX0NY6/rCaZgMGvaQO9XGSytgvoWI6/gkOVbQdZUN6VHE6lh+jpIhOOR+k5HHdGhFEdMl1OAU0WWcxS2ESvZXnq1O9LWaYvikym38P0XpZpRoRT1fqNPjeThmk3kSm2hM3c69BenCDgcBKHUyoM07isEzj8m8N0Ee4Reqb8hvRjDqs4/JQD0lUp11Qub4gROVBk+Sc9I5LpWo5fxAEy/6xCmU7msqbT//hvM71NZDFlD2kpX5vLAThVJRPaAxiBHJ+glfRskQnHetqW44Y4oAMiTVVth7oDg3kcFokspt/D9H7BDuQVErCsSpd+zmVBV/7G4TKRyXQpoEM47gkOVeu34bSW9fuIFE6xUikh/FUu1nHgyRfS6VK063zHc9ysOsSRMkO6IyYEewLCcgromBplWsaEsLOUb6we0mK2pj5Si0yb6HWM0zJaTs+Ky19H20jcenpJLTIFtB+Xf5eUbaQ5TO/juCW1yINClYQulvJNl5QQbq5RputjQoh9LmkL4cHKHS8ABzKoyauE4CwEEMJcuW7pqnAMwaRTmRZmWAhzpHGrlgnlPU4v4LJXxoTgLIT7Wc7PVyrTYnqalDdMu7JMy1MWghLCCpbzrZLG8NzabWc6EtA3WKa7paOhTBxKCMtEzq0tRzJ/PNxwHtI5HC4RWdIWwp1y3fCsQjYrK6T53RaCAaYWwoMi8EgOPK2goBbK5mHlh3ynWQhpQrhWsrJ0ZfMdTTr35M0ihKtZzqmVy4QCV9FzcwmhQ/uOSCa/3eKxZA8A3ZN3lxxCWM6DhrdILmXz7FFkz8umI+rnySYE64w9M9tCCcxfENJZOYRwh5QUP6G3ULlF2bgHSSEh7M0C90cIaICiiuBar46cJoQsH8J1Urde+RQB0O+1NCEcJLe7YQwshJNyZcK9ZYJh00+9VtPzIkLwfQgPMNPvlyuTX/+y7VLUkR0hTOwiBPUhrGBC2EGKLsrHl200544Qvs4y/TmFB3wIGMaMlBDKtGmW7I4QzubyL5UkzkI4lOPulLiifpSV72ji0oRwpGQV66H904+F4AuP8eMQvYnNsvdw+ACbijumTMgi4dOE4A8Z4FQcHxaCj2kWZs5C6CaEshaCX84G2o7b6+3SbsP0Lp7B2C6r6K44Rwhj1ULYsoTQBUDJiLSF4BMCnIp1WwijJARTBPwG9DmuEDy6j3NYw2Elh+UcMDOwgsNNMrZNTkn5ODaPEK7hep0o1Ug+3Z1VcSJfv5vDbRxu4PB7DjdzWJAId/L/N3GYzs7AT8T49HqS6nQefAhZhLBPl0w+1na+mSZw2ZgW/BeH9RzQXpjlQfs9yuFeDlOZ5N+Yl0XCWVdECNvL/b3qlVtInxechfBVln/0hODnp22KtruRA9r1Dxxul7Iwk4DDJ9xiQvi23J91X59V7yt5SQthEgtXPGSwjDayJQBTR6dx7uFOfxDB2wyHDTo/vMtqop0ZpZmbK3CaEE6TdOlpx2ZZCB36FOPxQ8bnLKm7YoTZih9wOEZ+dRrqt/z7WHR9ERPDh6TuRZ1ntBYCTFVMtzm5TuN2ejetpReJUwv5D9H2LCOccpjKXC+WAw5f0e0c6zSynYp1+xBGTwjWFsAIbadTlZgNG4raDQ+9U6S9O/TJzPZzhHAmp/UthO9wXEMtBAMHTzTMnUKpAjpKQCg6QlrI6Vd1KZTd0xYLIQuDkOkx5C4V0PezLstUXUgXRsq1gZ/8EyRdHimM1EJAflrWDVFZC4TAi44O7R218f6SLGkN4bzckKHZFkIePmopDHPbXZSXJI5vsIWAhUnZFoIpKPwEGB4oGRwrlcY1KEtSifG/m9rA7MHqeHWWj2DzCKF4lgEdBUqgT/OlUQecInF4QuMXdTZFwS9wV0viHIHH73yG2UgsBGuXkC6Iyrif1tGLJUuUDXmTbWfywZ8QMkUF9CVJm2chDFPRkKHOWYbRWwiGO/AxXNA2GP5pe10ubQWr2MfH7rV21lmGllgIVlksVVUg7sokAgMBv66jnyD32DAgmSadLmvasblORdQ3pL9H5Hm0VNvv6A4jmKH4u9WHJ3XeLyFYu3Vo96jdOmzaflzyNEXNKxBrCZT4PadTdEM5C6EdhOBj5IbLuq4gjwySOLeGEOzpsZl2kieGKolOxfkKngTO3TeBjebvicWQdbhO0S5C0PH6kggvHTL4eOEcOIWE8SX+1MGUhRPi+iUEZx3gvRT86RRX0iLIKwvxAX1XfAw4/HvGNyHcERHsTMFmXBGCKXFAR0cgrImnpnwlEXT6PHoTwlhbh1A8ZLDqKyE8VPiUdebk9RG258rteQrWLyEgL10TsDoihCmSv09MEtnnUUQIbh1CWy2E21KEUIRn64YMbriAt6Pwd3fX0yKpSyAJAGQBlgE6h537JNKbEJo1y2BYYFyJF1rUoposnRxY4DfZ4eHF12HY+p4LefohBCujQ3tI/vjr0KdFvDzCQXyy7dBuySW1yXYuIgRdutz8WQafI53F9acUIeThiftbRwgGihs3aQf1O7YPXtnzthKCWghGCId2wQFFCejLTBrwVi/jzrq7pCnCtR9CMFwDwpy8/tmr3EUK3CVoTsR4JASDAr4eJfEZEjWuLAQHwj0RCHMkKk+p8N55QAeLdzqg/VnR95GARUxYrwDvNQ5T/OYRQvbCJMPJfpUQ1KkI56IuTrqVf+eLlRWy3YRfYLKGXpjCxM/LzvuZdrT2CehbER0E7AHaSbLKa7sOfVbkCegLHPaL2m7fqC0PSC0wK0cI7Zp27LYQRksIY3phUv60I5QICyiUFXWRkf8kMwXBk073C8DCFl2vYCYx5uUDOkyU0oigeYTQjw9BnYohzeF6H87hCA5HMi6nc8CilqUSl8RDTnKOkVkIB0eEAFtkouTst53F6WYnWDuxMh5maNth9ek82fjEjnKE0C4fgiOE+ePBQsheqehAwEs9zlOdo7OpaJ3LhkmM6a69Mm9JE0ITViqWsxDSPoRDuuqOdwawYAsdzvZXyHty280jsRA6tGfcuW3KsVc5GM6EBOJD26lT16+A5VG8UrFdFoJhAGuv/yFD1krFBloIrsP+JCKEVbywZRtfP1Lndg/eh9ddmEAJH5M0/vx3uy0Em2U4Siwie1/f3u3ASk/FZwX9l55fiCku9mMhGJFvpFdxGeuk7WxbMcPcLxD3WEfXbfRw19WSzL+nrRZClvVkOLmH47yIEM6XS0UE2zqnomt49Yart3pSvDDJV6okQLp2AduygRD2lKS+YrWbELLXIUCxEDbSKxmZtaJc8LNk4ZPEtx9CwH1OgfFyFdrhRsmuSOkdIVwVKX22z6ithJDEO+9/9QNBq/Nfg7d7G0wI2UMGUyB0XPgRdNhwldTXf9obCM6cxMatQaTwe8jlYkJoz5BBVyoaIXSvVHQdD5ujorPOFnyKOms/QwbkZWVgNkNN3I2yi1HympwkDkfQs6J7ZslVXy7XxkUvNzVryADCtQ1sPVjiUx1OPSDYYCMWHL5OJ+91hNCSIQMqZ41vc9pYsWhvd2GeOl9ZkkMGnVazvAy03hZCsxYmAQvUUTvvPyICnSJxydWaDtPPRB1vHb9w9BpJB0x8TIFXvxYC7kE+qsS3ROXoEMDKSSov/rey1cEI+r9SkvjtZudZ7zI0dWFSSNdzfVdnLrwzXLALlG4g2+n5Mhpwa7CFUDzLYAoAL7k+bVazy2nXWJ+geAANwUDQ8esm6RTYUh2Hz6bNIwQ4Fadm1iUGI/pHpxsDfpLoi2D+dZzrW4hLBKOAl3gXHSMlBOSp25AvjdpuWqoYa7ckSWCLbnUq6pDBJ6g2EYLVBdv46ZP/m4KP+XySZOheEsseSvnt11pCQEUdKRzGyqLvNYT0I55cfJmPgzwNzVQFyNiDPpmH3dCbEJq1UhEmJzYw6dAHGaP/RB3wEq7/LhJvbxqi/q7u06J0Czkddpx6R+brySMhBJRjnVnfVr09KutWKSvrUPKwdSc6196PhdC0lYoOnx24zTZwWNz17o3W6YwIuyXs/3m1QOcTpY9nHYTQSyZHgNhTMXfHpHwfQrKSlpn7sAv2ld/I4S8c8G2A6zjcxQHz7NhJ6QpWvN26TE7LM00IzfUhWCOEdD7XeW0UsIsUMMCuRI9xWMMNoP4E4Ih7EHQrc52RAHmqBXZfTBiWd78+hKx2w1MvIGzMYa9cP8z/Y9erazj+j/wLawWzEthg9nB6mHd6zlIwpwft8CFYHXV3ZuyCdB8H7GoFixDnm6J2mcmU8YpSZIBErfQh+KyXfFpASTv0YVEebC2GLcph+mIjlV7Tk8i3bRYCtkqHxYRxNHaOcmFbcVjhKZ91YNoRi7qAG3ZP2kRv6Eo2UgvBMvI7NjZBDegr3GZTOODDJcfx+YFsoezcVbYfYTqQ5UNomoWQhQ/WVwSEzVqP59/J3CaTYiJAeh9LHx87r8NCyJPF4ktaCP3tuoxMk8SQJ0SvdGlCaP6uy3k4FMWXVa4tteuy78fJk60onSOEidxp0t9laPKuy710GtfLthdwdYTQ4l2XkwoEcACSOaaSv2WAa5uFAGxQ77yQ1/mQ3rDLU7rRWgh+2Xnt1qtTIB9HCO3cMSkLmzL67GNcbCG0YNdlv8KjPS8mBHy5qe5pR//bjsXfZRgtHkX3OwtBTXrrlCHhy03lv8tQVEbZa44Qui0E+3JTvd9lGGsfaoGFkP3lJmBehoTLtk2vdE5vCj/UotOOWU/6rRlnUzuDT7m5PSTy8B58yq0YI9OlwafcinFy+51mEIKxxeBjr928ij0g7OvP9v6Bfuw1f11Bdy5bNgZ7J4ytj72+np98WR97fUQcqnUcY/Njr3DaXixwuHdZMGSo82OvN7B+69u2sYViJjsIQae7fslCnscB02dVhAu4HHwIEx8L8b/chCEDpvBwHemqkMfK+AWXh0VF/pAB01CYmqtaJrTJDGmj7g+1YEXkLRzOrRAntAcwAh55n4OfHaWpqt0gEzDAtPe90vlMvzGdqPp9IV+rUr9/xeVhuLCMw6UiE/bKwKHTv5s5vmpdsj63kWXQxXCGU+wxHaI3s2BncEAFABp2Aq4ioCwV0FYzmiNGF/cATFyvWibgcCZ3Pt1UxAAL6ACOB2nWIRMwOJW730tFoczJpVO+6HRVth1kQXnA4bjUQh58sCckvB2L63XIdJ50Nhz25NMXybAPRZXyoP+Yfp/LU5d7i0yOpOCQxUdg69AllHl2vNp4JA5TqczgGCAwQGAcIJCc9spzam3teJ+lxqJMWdNRWxsXP39fHf3rdZyPNZmyvPZ14JIs05dpLOq3346D8wECAwTGLwL/B+AXYbMt42DJAAAAAElFTkSuQmCC' width='80%' style='margin-left:10%;'><hr>Ada 7 buah kotak yang berisi huruf-huruf.<br>Huruf pertama G, huruf ke 3 R, huruf ke 4 G dan huruf ke 6 adalah J.<br>Ini adalah nama sebuah alat yang sering digunakan sehari-hari.<p>Sebutkan nama alat tersebut jika G kedua dipindahkan ke kotak ke 2,<br>huruf R dipindahkan ke kotak ke 4 dan huruf J diganti dengan huruf S,<br>lalu 2 buah kotak di urutan pertama dan ke 6 di hilangkan?</p>",
  answer: "GARPU" },

  { question: "9. '<span class='quotE'>Pada hari minggu ku turut Ayah ke kota</span>'.<br>Kalimat di atas adalah potongan lirik dari lagu anak-anak masa dulu.<br>Siapakah nama anak yang tidak turut ke kota pada lagu tersebut?",
  answer: "Ratna" },
   
  
      
];
let currentQuestion = 0;
let score = 0;
let wrongAttempts = 0;
let gameOver = false;

function displayQuestion() {
  const questionElement = document.getElementById("question");

  if (currentQuestion < questions.length) {
    const question = questions[currentQuestion];
    questionElement.innerHTML = question.question;
  } else {
    questionElement.innerHTML = "<b>Tunggu update berikutnya, Mang!</b>";
    gameOver = true;
    document.getElementById("answer").style.pointerEvents = 'none';
    document.getElementById("answer").style.opacity = '0.4';
    document.getElementById("jawab").style.pointerEvents = 'none';
    document.getElementById("jawab").style.opacity = '0.4';
  }
}

function submitAnswer() {
  const userAnswer = document.getElementById("answer").value.trim();
  const feedback = document.getElementById("feedback");

  // Validasi jika jawaban kosong
  if (userAnswer === "") {
    feedback.innerHTML = "<span style='color: orange;'>Isi jawaban dulu, Mang!</span>";
    return; // Stop proses jika kosong
  }

  const correctAnswer = questions[currentQuestion].answer;

  let correctAnswerPattern;

  // Tentukan pola berdasarkan soal yang aktif
  if (currentQuestion === 0) {
    correctAnswerPattern = /92[.,]5[%\s]*$/;  // Mengizinkan titik atau koma, diikuti dengan '%' atau spasi
  } else {
    // Gantikan tanda "-" dengan spasi dalam jawaban dan juga di jawaban yang benar
    const userAnswerModified = userAnswer.replace(/-/g, ' ');
    const correctAnswerModified = correctAnswer.replace(/-/g, ' ');

    correctAnswerPattern = new RegExp(correctAnswerModified, 'i');
  }

  // Cek jawaban sesuai pola regex
  if (correctAnswerPattern.test(userAnswer)) {
    // Jawaban benar
    if (wrongAttempts === 0) {
      score += 100;
    } else {
      score += (100 - (wrongAttempts * 5));
    }
    feedback.innerHTML = "<span style='color: #0F0;'>Bolelah..bener mang!</span>";
    currentQuestion++;
    wrongAttempts = 0;
  } else {
    // Jawaban salah
    feedback.innerHTML = "<span style='color: #F00;'>Salah mang!, cubo lagi!</span>";
    score -= 5;
    wrongAttempts++;
  }

  // Update skor dan kosongkan input
  document.getElementById("score-nya").innerText = score;
  document.getElementById("answer").value = "";
  displayQuestion();
}

// Panggil pertanyaan pertama
displayQuestion();