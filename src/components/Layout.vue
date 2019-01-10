<template>
<div class="layout">
  <Layout>
    <Sider ref="side1" collapsible :collapsed-width="78" v-model="isCollapsed">
      <Menu :active-name="nowMenuItem" :open-names="openItems" @on-select="onSelect" theme="dark" width="auto" :class="menuitemClasses" accordion>
        <template v-for="item in menuItems">
          <Submenu :name="`menu-${item.name}`" v-if="item.children" :key="item.name">
            <template slot="title">
                <Icon :type="item.icon" />
                <span>{{ item.text }}</span>
            </template>
            <MenuItem
              :name="`menu-${child.name}`"
              v-for="child in item.children"
              :key="child.name"
              :to="`${$route.matched[0].path}/${child.name}`"
              :style="{ paddingLeft: '24px' }"
            >
              <Icon :type="child.icon" />
              <span>{{ child.text }}</span>
            </MenuItem>
          </Submenu>
          <MenuItem :name="`menu-${item.name}`" :key="item.name" :to="`${$route.matched[0].path}/${item.name}`" v-else>
          <Icon :type="item.icon"></Icon>
          <span>{{ item.text }}</span>
          </MenuItem>
        </template>
      </Menu>
    </Sider>
    <Layout>
      <Header :style="{padding: 0}" class="layout-header-bar">
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
        <div class="layout-header-title">
          课程学习中心
        </div>
      </Header>
      <Content :style="{margin: '20px', background: '#fff', minHeight: '980px'}">
        <slot></slot>
      </Content>
    </Layout>
  </Layout>
</div>
</template>
<script>
export default {
  props: {
    menuItems: {
      type: Array,
      default: function () {
        return [
          { text: 'Option 1', icon: 'ios-navigate' },
          { text: 'Option 2', icon: 'ios-search' },
          { text: 'Option 3', icon: 'ios-settings' }
        ]
      }
    }
  },
  data () {
    return {
      isCollapsed: false,
      curMenuItem: '',
      openItems: []
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    nowMenuItem () {
      if (this.curMenuItem === '') {
        return `menu-${this.$route.name}`
      } else {
        return this.curMenuItem
      }
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    },
    onSelect (name) {
      this.curMenuItem = name
    }
  }
}
</script>
<style scoped lang="less">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  text-align: left;
  .layout-header-title {
    display: inline-block;
    font-size: 25px;
  }
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all .3s;
  vertical-align: sub;
  cursor: pointer;
  &:hover {
    color: #2d8cf0;
  }
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 85px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width .2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
