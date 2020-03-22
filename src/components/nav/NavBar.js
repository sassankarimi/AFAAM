import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import NewRequestBtn from "../common/newRequestbtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faToolbox, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FiUser, FiDollarSign, FiLogOut } from "react-icons/fi";
import { logout, soon } from '../common/funcComponents/FuncComponent';
import { connect } from 'react-redux';

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const menuIconStyle = {
    color: '#bcc2d1',
    fontSize: 20,

  }
  const dropDownStyle = {
    color: "rgba(0,0,0,.5)",
    fontSize: 14,
    fontWeight: "bold",

  }
  return (
    <Navbar className="customeze-navbar" color="light" light expand="md" style={{ fontFamily: "IRANYekanBold" }}>
      <NavbarToggler onClick={toggle} />
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav right={'true'}>
          <FiUser size="35" className="p-1" style={{ color: "#bcc2d1", border: "1.5px solid #bcc2d1", borderRadius: 25 }} />
          {/* <span className='nav-item-customize'>حساب کاربردی</span> */}
        </DropdownToggle>
        <DropdownMenu right={true}>
          <Link to='/account' style={{ textDecoration: 'none' }}>
            <DropdownItem style={dropDownStyle} ><FiUser size="20" style={{ color: "#bcc2d1" }} /> حساب کاربری </DropdownItem>
          </Link>
          <DropdownItem style={dropDownStyle} onClick={() => soon()} ><FiDollarSign size="20" style={{ color: "#bcc2d1" }} /> موجودی</DropdownItem>
          <DropdownItem divider />
          <DropdownItem style={dropDownStyle} onClick={() => logout()}  ><FiLogOut size="20" style={{ color: "#bcc2d1" }} /> خروج</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar style={{ fontSize: 14 }}>
          <NavItem>
            <Link className='nav-link' to='/account' style={{ textDecoration: 'none' }}>
              <FontAwesomeIcon icon={faUserAlt} className="mt-1" style={menuIconStyle} /><span className='nav-item-customize ml-3' style={{ fontFamily: "IRANYekanBold" }}>حساب کاربری</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to='/loans' style={{ textDecoration: 'none' }}>
              <FontAwesomeIcon icon={faToolbox} className="mt-1" style={menuIconStyle} />
              {
                localStorage.getItem('crl') !== '0' ?
                  <>
                    <span className='nav-item-customize ml-3' style={{ fontFamily: "IRANYekanBold" }}>وام های درخواستی</span>
                    <span className='nav-item-customize-badge py-1 px-2'>{localStorage.getItem('crl') || ''} وام درحال بازپرداخت</span>
                  </>
                  :
                  <>
                    <span className='nav-item-customize ml-3' style={{ fontFamily: "IRANYekanBold" }}>وام های درخواستی</span>
                    <span className='nav-item-customize-badge py-1 px-2'>وام درحال بازپرداخت ندارید</span>
                  </>
              }
            </Link>
          </NavItem>
          <NavItem onClick={() => soon()}>
            <NavLink href="#"><FontAwesomeIcon icon={faChartLine} className="mt-1" style={menuIconStyle} /><span className='nav-item-customize ml-2' style={{ fontFamily: "IRANYekanBold" }}>سرمایه گذاری (در حال توسعه)</span></NavLink>
          </NavItem>
          <NavItem onClick={() => logout()}>
            <NavLink href="#"><FontAwesomeIcon icon={faSignOutAlt} className="mt-1" style={menuIconStyle} /><span className='nav-item-customize ml-2' style={{ fontFamily: "IRANYekanBold" }}>خروج</span></NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <Link to='/request' style={{ textDecoration: 'none' }}>
        <NewRequestBtn />
      </Link>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  currentloans: state.profile.profileData.current_loans
});

export default connect(mapStateToProps)(NavBar);
