<template>
  <div class="FMenuButton" :class="btnClass">
    <div
      class="FMenuButton__container"
      @click="emitClick"
      :class="btnContainerClass"
    >
      <div class="FMenuButton__icon">
        <div
          v-for="(line, index) in 3"
          :key="index"
          class="FMenuButton__line"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'f-menu-button',

  data: () => ({ noHover: false, time: null }),

  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    }
  },

  watch: {
    isOpen(open) {
      if (open) return

      this.noHover = true
      this.resetHover()
    }
  },

  computed: {
    btnClass() {
      return [
        {
          'FMenuButton__container--open': this.isOpen,
          'FMenuButton__container--no-hover': this.noHover
        }
      ]
    },
    btnContainerClass() {
      return `color--${this.color}`
    }
  },
  methods: {
    emitClick() {
      this.$emit('click')
    },
    resetHover() {
      clearTimeout(this.time)
      this.time = setTimeout(() => {
        this.noHover = false
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
$lineW: 18px;
$middleLineW: 13px;
$lastLineW: 16px;
$timeAnimation: 0.3s;
$timeTransition: 0.2s;

.FMenuButton {
  &__container {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      .FMenuButton__line {
        &:nth-child(2) {
          transform: translateX($middleLineW - $lineW);
        }
        &:nth-child(3) {
          transform: translateX($lastLineW - $lineW);
        }
      }
    }

    &--open {
      .FMenuButton__line {
        &:nth-child(1) {
          animation-name: activeLineTop;
        }
        &:nth-child(2) {
          animation-name: activeLineMiddle;
        }
        &:nth-child(3) {
          animation-name: activeLineBottom;
        }
      }
    }

    &--no-hover {
      .FMenuButton__line {
        &:nth-child(1) {
          animation-name: disableLineTop;
        }
        &:nth-child(2) {
          animation-name: disableLineMiddle;
        }
        &:nth-child(3) {
          animation-name: disableLineBottom;
        }
      }
    }
  }

  &__icon {
    width: $lineW;
    height: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    pointer-events: none;
  }

  &__line {
    height: 2px;
    background-color: #fff;
    border-radius: 5px;
    transition-property: transform;
    transition-duration: $timeTransition;
    transition-timing-function: ease-in-out;
    position: relative;
    transform-origin: center;
    animation-duration: $timeAnimation;
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
    &:nth-child(1) {
      width: $lineW;
    }
    &:nth-child(2) {
      width: 13px;
    }
    &:nth-child(3) {
      width: 16px;
    }
  }
}

@keyframes activeLineTop {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-45deg);
  }
}

@keyframes disableLineTop {
  0% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes activeLineMiddle {
  0% {
    transform: translateX($middleLineW - $lineW);
    opacity: 1;
  }
  100% {
    transform: translateX(20px);
    opacity: 0;
  }
}

@keyframes disableLineMiddle {
  0% {
    transform: translateX(20px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes activeLineBottom {
  0% {
    transform: rotate(0deg);
    width: $lineW;
  }
  100% {
    transform: rotate(45deg);
    width: $lineW;
  }
}

@keyframes disableLineBottom {
  0% {
    transform: rotate(45deg) translateX($lastLineW - $lineW);
    width: $lineW;
  }
  100% {
    transform: rotate(0deg) translateX(0);
    width: $lastLineW;
  }
}
</style>
