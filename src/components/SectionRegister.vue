<template>
  <section class="bg-[#493b69] text-white py-10" id="register">
    <div class="container">
      <div class="max-w-lg">
        <h2>Заповніть форму</h2>
        <form @submit.prevent="sendEmail">
          <div class="mb-4 md:flex md:space-x-4">
            <div class="mb-4 md:mb-0 md:flex-1">
              <label for="firstname" class="sr-only">Iм'я*</label>
              <input type="text" id="firstname" name="firstname" class="form-control" placeholder="Iм'я*" v-model="firstname" required>
            </div>
            <div class="md:flex-1">
              <label for="lastname" class="sr-only">Прiзвище*</label>
              <input type="text" id="lastname" name="lastname" class="form-control" placeholder="Прiзвище*" v-model="lastname" required>
            </div>
          </div>
          <div class="mb-4">
            <label for="phone" class="sr-only">Телефон*</label>
            <input type="text" id="phone" name="phone" inputmode="tel" class="form-control" placeholder="Телефон*" v-model="phone" required>
          </div>
          <div class="mb-4">
            <label for="email" class="sr-only">E-mail*</label>
            <input type="email" id="email" name="email" class="form-control" placeholder="E-mail*" v-model="email" required>
          </div>
          <div class="mb-4">
            <label for="accommodation" class="sr-only">Тип проживання</label>
            <select id="accommodation" name="accommodation" class="form-control" v-model="accommodation">
              <option value="" selected disabled>Оберіть бажаний тип проживання</option>
              <option value="Готель">Готель</option>
              <option value="Наметове містечко">Наметове містечко</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="payment" class="sr-only">Спосіб оплати</label>
            <select id="payment" name="payment" class="form-control" v-model="payment">
              <option value="" selected disabled>Оберіть спосіб оплати</option>
              <option value="Готівкою">Готівкою</option>
              <option value="На картку ПриватБанк">На картку ПриватБанк</option>
              <option value="На картку Monobank">На картку Monobank</option>
              <option value="Iнший (вкажіть в коментарях)">Iнший (вкажіть в коментарях)</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="message" class="sr-only">Коментарі</label>
            <textarea id="message" name="message" rows="4" cols="30" class="form-control" placeholder="Коментарі" v-model="message"></textarea>
          </div>
          <!-- <div class="mb-4">
            <vue-recaptcha
              :siteKey="sitekey"
              size="normal"
              theme="light"
              @verify="recaptchaVerified"
              @expire="recaptchaExpired"
              ref="vueRecaptcha"
              :class="{ 'animate-scale': isNotFilled }"
            ></vue-recaptcha>
          </div> -->
          <div class="mt-6">
            <div class="py-2 border border-transparent text-red-500" v-if="isError">
              Виникла помилка. Спробуйте оновити сторінку.
            </div>
            <div class="py-2 border border-transparent text-emerald-500" v-else-if="isSent">
              Дякуємо за реєстрацію! Незабаром ми зв'яжемося з&nbsp;вами для&nbsp;уточнення деталей.
            </div>
            <button type="submit" class="btn btn-iconic btn-indigo" :disabled="isLoading" v-else>
              <span>Надіслати</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
        </form>
        <div class="mt-12">
          <p class="mb-4">Або просто напишіть нам в месенджер:</p>
          <div class="flex flex-col items-start sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="https://t.me/kapuka_mmc" target="_blank" rel="nofollow" class="btn btn-iconic btn-telegram">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" width="14" height="16" viewBox="0 0 448 512"><path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg>
              <span>Telegram</span>
            </a>
            <a href="viber://chat?number=380634025924" target="_blank" rel="nofollow" class="btn btn-iconic btn-viber">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M444 49.9C431.3 38.2 379.9.9 265.3.4c0 0-135.1-8.1-200.9 52.3C27.8 89.3 14.9 143 13.5 209.5c-1.4 66.5-3.1 191.1 117 224.9h.1l-.1 51.6s-.8 20.9 13 25.1c16.6 5.2 26.4-10.7 42.3-27.8 8.7-9.4 20.7-23.2 29.8-33.7 82.2 6.9 145.3-8.9 152.5-11.2 16.6-5.4 110.5-17.4 125.7-142 15.8-128.6-7.6-209.8-49.8-246.5zM457.9 287c-12.9 104-89 110.6-103 115.1-6 1.9-61.5 15.7-131.2 11.2 0 0-52 62.7-68.2 79-5.3 5.3-11.1 4.8-11-5.7 0-6.9.4-85.7.4-85.7-.1 0-.1 0 0 0-101.8-28.2-95.8-134.3-94.7-189.8 1.1-55.5 11.6-101 42.6-131.6 55.7-50.5 170.4-43 170.4-43 96.9.4 143.3 29.6 154.1 39.4 35.7 30.6 53.9 103.8 40.6 211.1zm-139-80.8c.4 8.6-12.5 9.2-12.9.6-1.1-22-11.4-32.7-32.6-33.9-8.6-.5-7.8-13.4.7-12.9 27.9 1.5 43.4 17.5 44.8 46.2zm20.3 11.3c1-42.4-25.5-75.6-75.8-79.3-8.5-.6-7.6-13.5.9-12.9 58 4.2 88.9 44.1 87.8 92.5-.1 8.6-13.1 8.2-12.9-.3zm47 13.4c.1 8.6-12.9 8.7-12.9.1-.6-81.5-54.9-125.9-120.8-126.4-8.5-.1-8.5-12.9 0-12.9 73.7.5 133 51.4 133.7 139.2zM374.9 329v.2c-10.8 19-31 40-51.8 33.3l-.2-.3c-21.1-5.9-70.8-31.5-102.2-56.5-16.2-12.8-31-27.9-42.4-42.4-10.3-12.9-20.7-28.2-30.8-46.6-21.3-38.5-26-55.7-26-55.7-6.7-20.8 14.2-41 33.3-51.8h.2c9.2-4.8 18-3.2 23.9 3.9 0 0 12.4 14.8 17.7 22.1 5 6.8 11.7 17.7 15.2 23.8 6.1 10.9 2.3 22-3.7 26.6l-12 9.6c-6.1 4.9-5.3 14-5.3 14s17.8 67.3 84.3 84.3c0 0 9.1.8 14-5.3l9.6-12c4.6-6 15.7-9.8 26.6-3.7 14.7 8.3 33.4 21.2 45.8 32.9 7 5.7 8.6 14.4 3.8 23.6z"></path></svg>
              <span>Viber</span>
            </a>
            <a href="https://m.me/aleksandr.kapuka" target="_blank" rel="nofollow" class="btn btn-iconic btn-messenger">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" width="10" height="16" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com'
// import vueRecaptcha from 'vue3-recaptcha2'

export default {
  components: {
    // vueRecaptcha
  },
  data() {
    return {
      isLoading: false,
      isSent: false,
      isError: false,
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      accommodation: '',
      payment: '',
      message: '',
      // sitekey: '6LeuUD0bAAAAAGqvA8Yks9rgLWmCvypMoQcB5e0t',
      // isVerified: false,
      // isNotFilled: false,
    }
  },
  methods: {
    // recaptchaVerified() {
    //   this.isVerified = true
    // },
    // recaptchaExpired() {
    //   this.$refs.vueRecaptcha.reset()
    // },
    sendEmail(e) {
      // if (!this.isVerified) {
      //   this.isNotFilled = true
      //   setTimeout(() => {
      //     this.isNotFilled = false
      //   }, 2000)
      //   return
      // }

      this.isLoading = true
      emailjs.sendForm('service_bbd0avn', 'template_eq8mxae', e.target, 'user_zJwztgGwINLHuIaEBLa44')
        .then(() => {
          this.isSent = true
          this.firstname = this.lastname = this.phone = this.email = this.accommodation = this.payment = this.message = ''
          this.resetForm()
        }, () => {
          this.isError = true
          this.resetForm()
        })
    },
    resetForm() {
      this.isLoading = false
      // this.$refs.vueRecaptcha.reset()
      setTimeout(() => {
        this.isSent = false
        this.isError = false
      }, 10000)
    },
    // renderWait() {
    //   setTimeout(() => {
    //     if (typeof grecaptcha !== 'undefined' && typeof grecaptcha.render !== 'undefined') {
    //       this.render()
    //     } else {
    //       this.renderWait()
    //     }
    //   }, 200)
    // },
    // render() {
    //   const recaptchaDiv = document.createElement('div')
    //   recaptchaDiv.className = 'outside-badge'
    //   document.body.appendChild(recaptchaDiv)

    //   this.widgetId = grecaptcha.render(recaptchaDiv, {
    //     sitekey: this.sitekey,
    //     size: 'normal',
    //     theme: 'light',
    //     callback: token => {
    //       this.callback(token)
    //       grecaptcha.reset(this.widgetId)
    //     }
    //   })
    //   this.loaded = true
    // },
  },
  // mounted() {
  //   if (typeof grecaptcha === 'undefined' || typeof grecaptcha.render === 'undefined') {
  //     const script = document.createElement('script')
  //     script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&hl=uk'
  //     script.onload = this.renderWait
  //     document.head.appendChild(script)
  //   } else {
  //     this.render()
  //   }
  // }
}
</script>
