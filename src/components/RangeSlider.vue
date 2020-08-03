<template>
  <div class="slider">
    <div class="slider__input">
      <div ref="slider" class="slider__wrap">
        <div ref="toggle" class="slider__toggle" />
      </div>
    </div>

    <p class="slider__value">{{ valueToggle }}</p>

    <div class="slider__buttons">
      <button type="button" @click="setPosition(25)">25%</button>
      <button type="button" @click="setPosition(50)">50%</button>
      <button type="button" @click="setPosition(75)">75%</button>
      <button type="button" @click="setPosition(100)">100%</button>
    </div>
  </div>
</template>

<script>
  import MobileDetect from 'mobile-detect';

  export default {
    props: {
      value: Number,
      startValue: {
        type: Number,
        required: true
      },
    },
    data() {
      return {
        positionX: null,
        positionToggle: null,
        percentToggle: this.startValue
      }
    },
    computed: {
      valueToggle() {
        return Math.round(this.percentToggle) + '%'
      }
    },
    methods: {
      moveToggle(event) {
        event.preventDefault();

        if (event.targetTouches) {
          this.positionX = event.targetTouches[0].clientX - this.$refs.toggle.getBoundingClientRect().left

          document.addEventListener('touchmove', this.onMove)
          document.addEventListener('touchend', this.onUp)
        } else {
          this.positionX = event.clientX - this.$refs.toggle.getBoundingClientRect().left

          document.addEventListener('mousemove', this.onMove)
          document.addEventListener('mouseup', this.onUp)
        }
      },
      onMove(event) {
        if (event.targetTouches) {
          this.positionToggle = event.targetTouches[0].clientX - this.positionX - this.$refs.slider.getBoundingClientRect().left
        } else {
          this.positionToggle = event.clientX - this.positionX - this.$refs.slider.getBoundingClientRect().left
        }

        if (this.positionToggle < 0) {
          this.positionToggle = 0
        }

        const rightPosition = this.$refs.slider.offsetWidth - this.$refs.toggle.offsetWidth

        if (this.positionToggle > rightPosition) {
          this.positionToggle = rightPosition
        }

        this.$refs.toggle.style.left = this.positionToggle + 'px'

        this.percentToggle = this.positionToggle / (this.$refs.slider.offsetWidth - this.$refs.toggle.offsetWidth) * 100

        this.$emit('input', Math.round(this.percentToggle))
      },
      onUp() {
        if (event.targetTouches) {
          document.removeEventListener('touchend', this.onUp)
          document.removeEventListener('touchmove', this.onMove)
        } else {
          document.removeEventListener('mouseup', this.onUp)
          document.removeEventListener('mousemove', this.onMove)
        }
      },
      preventDrag() {
        return false
      },
      setPosition(percent) {
        this.$refs.toggle.style.left = (this.$refs.slider.offsetWidth - this.$refs.toggle.offsetWidth) * percent / 100 + 'px'

        this.percentToggle = percent
      }
    },
    mounted() {
      const md = new MobileDetect(window.navigator.userAgent)

      if (md.mobile()) {
        this.$refs.toggle.addEventListener('touchstart', this.moveToggle)
      } else {
        this.$refs.toggle.addEventListener('mousedown', this.moveToggle)
        this.$refs.toggle.addEventListener('dragstart', this.moveToggle)
      }

      this.setPosition(this.startValue)
    }
  }
</script>

<style lang="less">
  @import '@/assets/variables.less';

  .slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: @breakpoint-md - 1px) {
      width: 100%;
    }
  }

  .slider__input {
    width: 100%;
    background-color: #0884ff;
    padding: 10px;
    border-radius: 30px;
    margin-bottom: @indent-base;
  }

  .slider__toggle {
    position: relative;
    background-color: #fff;
    border-radius: 50%;
    left: 0;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .slider__value {
    margin-bottom: @indent-base;
    border: 1px solid darkblue;
    padding: @indent-base;
    border-radius: 4px;
  }

  .slider__buttons {
    display: flex;
    width: 100%;
    justify-content: space-around;

    button {
      background-color: darkblue;
      color: #fff;
      padding: @indent-base @indent-base * 2;
      border-radius: 4px;
    }
  }
</style>
