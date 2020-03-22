import React from "react";
import { Jumbotron, Row, Col, Table } from "reactstrap";
import { connect } from 'react-redux';
import { invoiceStart } from '../../redux/invoice/actions/invoice.actions';
import Loading from '../common/loading/Loading.component';
import { persianNumberCurrency } from '../common/funcComponents/FuncComponent';
import moment from 'jalali-moment';

const ReqeustStepThree = props => {

  const { final_loan, purchase_info } = props;

  const handleReqInvoice = () => {
    props.invoice_request(final_loan.prepayment_invoice);
    ;
  }

  return (
    <>
      <Loading active={props.loading} />
      <Jumbotron
        className="shadow factor"
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "915px",
          padding: 0,
          display: "inline-block"
        }}
      >
        <div className="factor-header">
          <Row>
            <Col md={{ size: 12 }}>
              <span className="factor-header-txt">
                فاکتور پرداخت {purchase_info.product_name}
              </span>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 12 }}>
              <span className="factor-header-spliter"></span>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 12 }}>
              <div className="factor-header-box">
                <span className="factor-header-box-head">تاریخ</span>
                <span className="factor-header-box-txt">
                  {moment(final_loan.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                </span>
              </div>
              <div className="factor-header-box">
                <span className="factor-header-box-head">شماره فاکتور</span>
                <span className="factor-header-box-txt">{final_loan.id}</span>
              </div>
              <div className="factor-header-box">
                <span className="factor-header-box-head">
                  مشخصات پرداخت کننده
                </span>
                <span className="factor-header-box-txt">
                  {localStorage.getItem('name') || ''} ({localStorage.getItem('phone') || ''}){" "}
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <div className="factor-body">
          <Row>
            <Col md={{ size: 12 }}>
              <Table className="factor-table">
                <thead>
                  <tr>
                    <th className='factor-table-head'>توضیحات</th>
                    <th className='factor-table-head'>تعداد</th>
                    <th className='factor-table-head'>مبلغ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className='factor-table-desc' scope="row">پیش پرداخت</th>
                    <td className='factor-table-count'>1</td>
                    <td className='factor-table-money'>{persianNumberCurrency(final_loan.prepayment.toString())} ریال</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
        <div className="factor-footer">
          <Row>
            <Col md={{ size: 6 }}>
              <div className='factor-footer-result'>
                <Row>
                  <Col md={{ size: 12 }}>
                    <div className="factor-footer-pricing">
                      <span className="factor-footer-pricing-txt">
                        مبلغ کل افام:
                      </span>
                      <span className="factor-footer-pricing-money">
                        {persianNumberCurrency(final_loan.refund.toString())} ریال   
                      </span>
                    </div>
                  </Col>
                  <Col md={{ size: 12 }}>
                    <div className="factor-footer-pricing">
                      <span className="factor-footer-pricing-txt">
                        مبلغ فاکتور:
                      </span>
                      <span className="factor-footer-pricing-money">
                        {persianNumberCurrency(final_loan.price.toString())} ریال   
                      </span>
                    </div>
                  </Col>
                  <Col md={{ size: 12 }}>
                    <div className="factor-footer-pricing">
                      <span className="factor-footer-pricing-txt">
                        باقی مانده:
                      </span>
                      <span className="factor-footer-pricing-money">
                        {persianNumberCurrency(final_loan.penalty_amount.toString())} ریال
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={{ size: 6 }}>
              <div className="factor-footer-result">
                <Row>
                  <Col md={{ size: 12 }}>
                    <div className="factor-footer-result-txt">
                      <span className="factor-footer-result-txt-title">
                        مبلغ قابل پرداخت
                      </span>
                      <span className="factor-footer-result-txt-money">
                        {persianNumberCurrency(final_loan.prepayment.toString())} ریال
                      </span>
                    </div>
                  </Col>
                  <Col md={{ size: 12 }}>
                    <button className="factor-footer-result-btn" onClick={handleReqInvoice}>
                      تایید و پرداخت فاکتور
                    </button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Jumbotron>
    </>
  );
};

const mapStateToProps = (state) => ({
  final_loan: state.loan.loanUpdatedResult,
  purchase_info: state.purchase.purchaseResult,
  profileData:state.profile.profileData
});

const mapDispatchToProps = (dispatch) => ({
  invoice_request: (param) => {
    dispatch(invoiceStart(param));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ReqeustStepThree);
