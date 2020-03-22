import React from "react";
import { FaRegBuilding } from "react-icons/fa";
import {
  InputGroup,
  InputGroupAddon,
  Jumbotron,
  Input,
  Label,
  Container
} from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import axios from 'axios';
// import api from '../../config/api.json';
// import server from '../../config/server.json';
import Loading from '../common/loading/Loading.component';
import { checkObjLength } from '../common/funcComponents/FuncComponent';
import { startPurchase, updatePurchase } from '../../redux/purchase/actions/purchase.actions';
import { toast_error } from '../common/funcComponents/FuncComponent';
import { connect } from 'react-redux';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const RequestStepOne = props => {
  const purchaseData = props.purchaseResult;

  const [state, setState] = React.useState({
    checkedA: props.purchaseResult.length > 0 || checkObjLength(props.purchaseResult) > 0 ? true : false,
    storeName: purchaseData.store_name || '',
    productName: purchaseData.product_name || '',
    productPrice: purchaseData.price ? parseFloat(purchaseData.price).toFixed() : '',
    purchaseID: props.purchaseResult.id || 0
  });
  const handleChecked = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };


  const handleStoreName = (e) => {
    setState({ ...state, storeName: e.target.value });
  }

  const handleProductName = (e) => {
    setState({ ...state, productName: e.target.value });
  }

  const handleProductPrice = (e) => {
    let val = e.target.value;
    let numberRegex = /^\d+$/g;
    if (val !== "") {
      if (numberRegex.test(val)) {
        setState({ ...state, productPrice: e.target.value });
      } else {
        return;
      }
    } else {
      setState({ ...state, productPrice: '' });
    }
  }

  const handleSendPurchase = () => {
    const { productName, storeName, productPrice } = state;

    if (state.productName === '' ||
      state.storeName === '' ||
      state.productPrice === '') {
      toast_error('ورودی ها را به درستی وارد کنید');
    } else {
      if (state.checkedA) {
        props.purchase_start({ productName, storeName, productPrice });
      } else {
        toast_error('تایید اطلاعات وارد شده الزامیست');;
      }
    }
  };

  const handleSendUpdatePurchase = () => {
    const { productName, storeName, productPrice, purchaseID } = state;

    if (state.productName === '' ||
      state.storeName === '' ||
      state.productPrice === '') {
      toast_error('ورودی ها را به درستی وارد کنید');
    } else {
      if (state.checkedA) {
        props.update_purchase_start({ productName, storeName, productPrice, purchaseID });
      } else {
        toast_error('تایید اطلاعات وارد شده الزامیست');;
      }
    }
  };

  // React.useEffect(() => {
  //   console.log(props.purchaseResult);
  // }, [props.purchaseResult]);

  return (
    <Container style={{ textAlign: "center" }}>
      <Jumbotron
        className="shadow req-jumbo"
        style={{ background: "#fff", padding: 0, display: "inline-block" }}
      >
        <div className="p-5">
          <p
            className="px-2"
            style={{ textAlign: "right", fontWeight: 600, direction: "rtl" }}
          >
            درخواست جدید{" "}
            <span className="info-txt">
              (ایجاد درخواست جدید در اعتبار شما تاثیر منفی ندارد)
            </span>
          </p>
          <div
            className="mb-4"
            style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}
          ></div>
          <div className="px-5"></div>
          <Label
            style={{ float: "right" }}
            className="text-right"
            for="company"
          >
            نام فروشگاه
          </Label>
          <br />
          <div className="input-detail-container">
            <InputGroup>
              <Input
                className="text-right dir-rtl"
                name="storeName"
                id="company"
                placeholder="مثال: دیجی کالا"
                onChange={handleStoreName}
                value={state.storeName}
              />
              <InputGroupAddon addonType="append">
                <FaRegBuilding className="input-icon-right" size="38px" />
              </InputGroupAddon>
            </InputGroup>
            <span className="request-input-detail">
              نام فروشگاه موسسه یا بنگاهی که کالا ویا خدمات مورد نظر شما را
              ارائه می کند
            </span>
          </div>

          <div className="px-5 mt-5"></div>
          <Label
            style={{ float: "right" }}
            className="text-right"
            for="company"
          >
            نام محصول
          </Label>
          <br />
          <div className="input-detail-container">
            <InputGroup>
              <Input
                className="text-right dir-rtl"
                name="productName"
                id="name"
                placeholder="مثال: هدفون بیتز مدل A400 مشکی"
                onChange={handleProductName}
                value={state.productName}
              />
              <InputGroupAddon addonType="append">
                <FaRegBuilding className="input-icon-right" size="38px" />
              </InputGroupAddon>
            </InputGroup>
            <span className="request-input-detail">
              نام کالا و خدمات مورد نظر با جزییات دقیق
            </span>
          </div>

          <div className="px-5 mt-5"></div>
          <Label
            style={{ float: "right" }}
            className="text-right dir-rtl"
            for="company"
          >
            قیمت تمام شده (ریال)
          </Label>
          <br />
          <div className="input-detail-container">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <FaRegBuilding className="input-icon-left" size="38px" />
              </InputGroupAddon>
              <Input
                className="text-left dir-rtl"
                name="productPrice"
                id="Price"
                placeholder="مثال: 350,000"
                onChange={handleProductPrice}
                value={state.productPrice}
              />
            </InputGroup>
            <span className="request-input-detail dir-rtl">
              ...هزینه نهایی اعم از قیمت کالا ارسال کالا و
            </span>
          </div>
          <div
            className="mb-4 mt-4"
            style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}
          ></div>

          <FormControlLabel
            control={
              <GreenCheckbox
                checked={state.checkedA}
                className="customized-input-label"
                onChange={handleChecked("checkedA")}
                value="checkedA"
              />
            }
            label="اطلاعات وارد شده را تایید میکنم و در صورت درخواست سرویس افام فاکتور منطبق را ارائه می دهم"
            labelPlacement="start"
            className="customized-input-label"
          />
        </div>
        <div className="send-request-footer">
          {
            props.purchaseResult.length > 0 ||
              checkObjLength(props.purchaseResult) > 0 ?
              <button className="send-request-btn" onClick={() => { handleSendUpdatePurchase() }}>ذخیره و ویرایش درخواست</button>
              :
              <button className="send-request-btn" onClick={() => { handleSendPurchase() }}>ذخیره و ثبت درخواست</button>
          }
        </div>
      </Jumbotron>
      <Loading active={props.loading} />
    </Container>
  );
};


const mapStateToProps = (state) => {
  return {
    purchaseResult: state.purchase.purchaseResult,
    loading: state.purchase.loading,
    error: state.purchase.error,
  }
};

const mapDispatchToProps = (dispatch) => ({
  purchase_start: (purchaseInfo) => {
    dispatch(startPurchase(purchaseInfo));
  },
  update_purchase_start: (purchaseInfo) => {
    dispatch(updatePurchase(purchaseInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestStepOne);
