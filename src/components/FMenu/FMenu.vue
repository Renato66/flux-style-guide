<template>
  <aside class="FMenu">
    <nav class="FMenu__nav">
      <f-menu-list :expand="menuExpand" :items="menuItems">
        <slot slot="prepend" name="prepend" />

        <template v-slot:li="{ item }">
          <f-menu-item
            :menu-item="item"
            :menu-expand="menuExpand"
            :is-selected="isItemSelected(item)"
            v-bind="$attrs"
            @click="handleItemClick"
          />

          <f-menu-list
            v-if="hasSubMenu(item)"
            :hide-sub-items="hideSubItems(item)"
            :items="item.subItems"
            is-sub
          >
            <template v-slot:li="{ item: subItem }">
              <f-menu-item
                is-sub
                :menu-item="subItem"
                :menu-expand="menuExpand"
                :is-selected="isItemSelected(subItem)"
                v-bind="$attrs"
                @click="handleItemClick"
              />
            </template>
          </f-menu-list>
        </template>
      </f-menu-list>
    </nav>
  </aside>
</template>

<script>
import FMenuList from './FMenuList'
import FMenuItem from './FMenuItem'

export default {
  name: 'f-menu',

  components: {
    FMenuList,
    FMenuItem
  },

  data: () => ({ expandItem: '' }),

  props: {
    menuItems: {
      type: Array,
      default: () => ({})
    },
    menuSelected: {
      type: String,
      default: ''
    },
    menuExpand: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    menuExpand(expand) {
      if (!expand) this.expandItem = ''
    }
  },

  methods: {
    hideSubItems(menu) {
      const isSelected = this.isItemSelected(menu)
      const allowHide = !!(menu.subItems || []).length && !menu.openByDefault

      return (
        (!menu.openByDefault && !this.menuExpand) || (!isSelected && allowHide)
      )
    },
    hasSubMenu(menu) {
      return !!(menu.subItems || []).length
    },
    isItemSelected({ id, subItems }) {
      if (this.expandItem) return this.expandItem === id

      return (
        this.menuSelected === id ||
        !!(subItems || []).find(sub => sub.id === this.menuSelected)
      )
    },
    handleItemClick(menu) {
      if (!(menu.subItems || []).length) return this.$emit('click', menu)

      this.expandItem = !this.isItemSelected(menu) ? menu.id : ''
      if (!this.menuExpand) this.$emit('expand')
    }
  }
}
</script>

<style lang="scss" scoped>
/*
span.icon-widget {
  height: 100px;
  width: 10px;
}
*/

.FMenu {
  width: 70px;
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;

  font-family: var(--font-primary);

  &__button {
    margin: 0;
    width: 100%;
    text-align: center;
    min-height: 70px;
  }

  &__nav {
    display: inline-block;
    padding: 0;
    margin: 0;
    top: 0;
    position: relative;
    width: 100%;
    height: auto;
    flex-grow: 1;
  }
}
</style>
