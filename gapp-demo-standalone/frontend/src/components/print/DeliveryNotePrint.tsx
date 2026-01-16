/**
 * DeliveryNotePrint Component
 * A4 print-ready Delivery Note layout for warehouse operations.
 * Layout-only scaffold - no business logic or data binding.
 */

import './DeliveryNotePrint.css';

export default function DeliveryNotePrint() {
  return (
    <div className="dn-print-page">
      {/* ===== HEADER SECTION ===== */}
      <header className="dn-header">
        <div className="dn-header-left">
          <h1 className="dn-company-name">Company Name</h1>
          <h2 className="dn-document-title">DELIVERY NOTE</h2>
        </div>
        <div className="dn-header-right">
          <table className="dn-meta-table">
            <tbody>
              <tr>
                <td className="dn-meta-label">DN Number:</td>
                <td className="dn-meta-value">-</td>
              </tr>
              <tr>
                <td className="dn-meta-label">Date:</td>
                <td className="dn-meta-value">-</td>
              </tr>
              <tr>
                <td className="dn-meta-label">Outbound No:</td>
                <td className="dn-meta-value">-</td>
              </tr>
              <tr>
                <td className="dn-meta-label">Invoice No:</td>
                <td className="dn-meta-value">-</td>
              </tr>
              <tr>
                <td className="dn-meta-label">Customer PO:</td>
                <td className="dn-meta-value">-</td>
              </tr>
              <tr>
                <td className="dn-meta-label">GAPP PO:</td>
                <td className="dn-meta-value">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>

      {/* ===== ADDRESS SECTION ===== */}
      <section className="dn-address-section">
        <div className="dn-address-box">
          <h3 className="dn-address-title">Delivery To</h3>
          <div className="dn-address-content">
            <p className="dn-customer-name">Customer Name</p>
            <p className="dn-address-line">Address Line 1</p>
            <p className="dn-address-line">Address Line 2</p>
            <p className="dn-address-line">City, State, Postal Code</p>
            <p className="dn-contact-line">Contact: -</p>
            <p className="dn-contact-line">Phone: -</p>
          </div>
        </div>
        <div className="dn-address-box">
          <h3 className="dn-address-title">Dispatched From</h3>
          <div className="dn-address-content">
            <p className="dn-warehouse-name">Warehouse Name</p>
            <p className="dn-address-line">Warehouse Address Line 1</p>
            <p className="dn-address-line">Warehouse Address Line 2</p>
            <p className="dn-address-line">City, State, Postal Code</p>
          </div>
        </div>
      </section>

      {/* ===== ITEMS TABLE ===== */}
      <section className="dn-items-section">
        <table className="dn-items-table">
          <thead>
            <tr>
              <th className="dn-col-item-no">Item No</th>
              <th className="dn-col-part-number">Part Number</th>
              <th className="dn-col-description">Description</th>
              <th className="dn-col-uom">UOM</th>
              <th className="dn-col-quantity">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>2</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>3</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>4</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>5</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ===== TOTALS SECTION ===== */}
      <section className="dn-totals-section">
        <table className="dn-totals-table">
          <tbody>
            <tr>
              <td className="dn-totals-label">Total Quantity:</td>
              <td className="dn-totals-value">-</td>
            </tr>
            <tr>
              <td className="dn-totals-label">Total Cases:</td>
              <td className="dn-totals-value">-</td>
            </tr>
            <tr>
              <td className="dn-totals-label">Gross Weight:</td>
              <td className="dn-totals-value">-</td>
            </tr>
            <tr>
              <td className="dn-totals-label">Volume:</td>
              <td className="dn-totals-value">-</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ===== REMARKS SECTION ===== */}
      <section className="dn-remarks-section">
        <h3 className="dn-remarks-title">Remarks / Special Instructions</h3>
        <div className="dn-remarks-content">
          <p>-</p>
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="dn-footer">
        <div className="dn-footer-left">
          <h3 className="dn-footer-title">Delivery Information</h3>
          <table className="dn-delivery-info-table">
            <tbody>
              <tr>
                <td className="dn-info-label">Transporter:</td>
                <td className="dn-info-value">-</td>
              </tr>
              <tr>
                <td className="dn-info-label">Driver Name:</td>
                <td className="dn-info-value">-</td>
              </tr>
              <tr>
                <td className="dn-info-label">Driver Mobile:</td>
                <td className="dn-info-value">-</td>
              </tr>
              <tr>
                <td className="dn-info-label">Vehicle Type:</td>
                <td className="dn-info-value">-</td>
              </tr>
              <tr>
                <td className="dn-info-label">Vehicle Plate:</td>
                <td className="dn-info-value">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dn-footer-right">
          <h3 className="dn-footer-title">Receiver Confirmation</h3>
          <div className="dn-confirmation-block">
            <div className="dn-confirmation-row">
              <span className="dn-confirmation-label">NAME:</span>
              <span className="dn-confirmation-line"></span>
            </div>
            <div className="dn-confirmation-row">
              <span className="dn-confirmation-label">SIGN:</span>
              <span className="dn-confirmation-line"></span>
            </div>
            <div className="dn-confirmation-row">
              <span className="dn-confirmation-label">DATE:</span>
              <span className="dn-confirmation-line"></span>
            </div>
            <div className="dn-stamp-box">
              <span className="dn-stamp-text">STAMP</span>
            </div>
            <p className="dn-mandatory-note">* Stamp is mandatory for delivery confirmation</p>
          </div>
        </div>
      </footer>

      {/* ===== FOOTER NOTES ===== */}
      <section className="dn-footer-notes">
        <div className="dn-signatures">
          <div className="dn-signature-block">
            <span className="dn-signature-line"></span>
            <span className="dn-signature-label">Prepared by</span>
          </div>
          <div className="dn-signature-block">
            <span className="dn-signature-line"></span>
            <span className="dn-signature-label">Verified by</span>
          </div>
        </div>
        <div className="dn-page-number">
          <span>Page 1 of 1</span>
        </div>
      </section>
    </div>
  );
}
