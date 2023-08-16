import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <svg
          className="sidebar-brand-full"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="58"
          viewBox="0 0 512 496"
        >
          <path
            fill="currentColor"
            d="M448 69H137l-3-12q-5-23-22.5-37.5T70 5H21q-9 0-15 6T0 27q0 9 6 15t15 6h49q19 0 22 17l49 256q6 21 23.5 34t38.5 13h202q10 0 16-6t6-15q0-22-22-22H203q-14 0-20-12l-2-9h214q20 0 36.5-12t22.5-31l58-123v-5q0-27-18.5-45.5T448 69zM192 261h-19l-28-149h47v149zm85 0h-42V112h42v149zm86 0h-43V112h43v149zm53-17v2q-3 10-11 13V112h43q18 0 21 17zM256 432q0 18-12.5 30.5T213 475q-17 0-29.5-12.5T171 432t12.5-30.5T213 389q18 0 30.5 12.5T256 432zm171 0q0 18-12.5 30.5T384 475t-30.5-12.5T341 432t12.5-30.5T384 389t30.5 12.5T427 432z"
          />
        </svg>
        <svg
          className="sidebar-brand-full"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 100 100"
        >
          <path
            fill="currentColor"
            d="M49.369 11.228c-11.647-.171-27.826.079-31.157 9.027l-8.184 19.204a2.84 2.84 0 0 0-1.37-.865l-3.295-.927a2.86 2.86 0 0 0-3.535 1.983L.109 45.754a2.86 2.86 0 0 0 1.983 3.534l3.296.928c.11.03.22.04.33.058c-.63 1.57-1.022 3.296-1.022 4.323v22.32c0 1.144.48 1.674 1.242 1.922v5.946a4.008 4.008 0 0 0 4.017 4.017h10.777a4.008 4.008 0 0 0 4.017-4.017v-5.728h50.503v5.728a4.01 4.01 0 0 0 4.018 4.017h10.775a4.01 4.01 0 0 0 4.019-4.017V78.84c.763-.248 1.24-.778 1.24-1.922v-22.32c0-1.027-.393-2.753-1.022-4.323c.11-.017.22-.027.33-.058l3.297-.928a2.86 2.86 0 0 0 1.982-3.534l-1.717-6.104a2.861 2.861 0 0 0-3.536-1.983l-3.295.927a2.855 2.855 0 0 0-1.371.865l-8.184-19.204c-3.57-9.084-20.773-8.856-32.42-9.027Zm33.357 29.444c.194.576-.386.96-.993.995c0 0-1.984.168-4.72.389c-2.082-4.864-6.92-8.292-12.525-8.292c-6.151 0-11.373 4.13-13.048 9.754c-.464.006-1.003.026-1.434.026c-10.597 0-31.739-1.877-31.739-1.877c-.606-.036-1.187-.42-.993-.995c8.142-24.821 8.385-22.955 32.276-22.694c23.89.26 24.029-1.513 33.176 22.694Zm-18.238-2.217a8.886 8.886 0 0 1 7.447 3.991c-4.785.355-10.292.718-15.424.929a8.879 8.879 0 0 1 7.977-4.92zM9.407 46.51c.072.107.142.214.222.317h-.31zm5.294 6.234c2.096-.034 13.348 3.753 13.348 3.753c1.405.396 2.642 3.052 2.635 4.512c-.021 4.917-12.709 3.21-17.86 3.23a2.63 2.63 0 0 1-2.635-2.634V55.38c0-1.46 2.416-2.6 4.512-2.636zm70.598 0c2.096.035 4.512 1.176 4.512 2.636v6.225a2.63 2.63 0 0 1-2.635 2.635c-5.15-.02-17.839 1.686-17.86-3.231c-.007-1.46 1.23-4.116 2.635-4.512c0 0 11.252-3.787 13.348-3.753z"
            color="currentColor"
          />
        </svg>
        {/*<CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />*/}
        {/*<CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />*/}
        <svg
          className="sidebar-brand-narrow"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 100 100"
        >
          <path
            fill="currentColor"
            d="M49.369 11.228c-11.647-.171-27.826.079-31.157 9.027l-8.184 19.204a2.84 2.84 0 0 0-1.37-.865l-3.295-.927a2.86 2.86 0 0 0-3.535 1.983L.109 45.754a2.86 2.86 0 0 0 1.983 3.534l3.296.928c.11.03.22.04.33.058c-.63 1.57-1.022 3.296-1.022 4.323v22.32c0 1.144.48 1.674 1.242 1.922v5.946a4.008 4.008 0 0 0 4.017 4.017h10.777a4.008 4.008 0 0 0 4.017-4.017v-5.728h50.503v5.728a4.01 4.01 0 0 0 4.018 4.017h10.775a4.01 4.01 0 0 0 4.019-4.017V78.84c.763-.248 1.24-.778 1.24-1.922v-22.32c0-1.027-.393-2.753-1.022-4.323c.11-.017.22-.027.33-.058l3.297-.928a2.86 2.86 0 0 0 1.982-3.534l-1.717-6.104a2.861 2.861 0 0 0-3.536-1.983l-3.295.927a2.855 2.855 0 0 0-1.371.865l-8.184-19.204c-3.57-9.084-20.773-8.856-32.42-9.027Zm33.357 29.444c.194.576-.386.96-.993.995c0 0-1.984.168-4.72.389c-2.082-4.864-6.92-8.292-12.525-8.292c-6.151 0-11.373 4.13-13.048 9.754c-.464.006-1.003.026-1.434.026c-10.597 0-31.739-1.877-31.739-1.877c-.606-.036-1.187-.42-.993-.995c8.142-24.821 8.385-22.955 32.276-22.694c23.89.26 24.029-1.513 33.176 22.694Zm-18.238-2.217a8.886 8.886 0 0 1 7.447 3.991c-4.785.355-10.292.718-15.424.929a8.879 8.879 0 0 1 7.977-4.92zM9.407 46.51c.072.107.142.214.222.317h-.31zm5.294 6.234c2.096-.034 13.348 3.753 13.348 3.753c1.405.396 2.642 3.052 2.635 4.512c-.021 4.917-12.709 3.21-17.86 3.23a2.63 2.63 0 0 1-2.635-2.634V55.38c0-1.46 2.416-2.6 4.512-2.636zm70.598 0c2.096.035 4.512 1.176 4.512 2.636v6.225a2.63 2.63 0 0 1-2.635 2.635c-5.15-.02-17.839 1.686-17.86-3.231c-.007-1.46 1.23-4.116 2.635-4.512c0 0 11.252-3.787 13.348-3.753z"
            color="currentColor"
          />
        </svg>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
