import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { FiDownload, FiPrinter } from 'react-icons/fi'

const InvoiceGenerator = ({ orderData, onGenerate }) => {
  const invoiceRef = useRef(null)

  const generatePDF = async () => {
    if (!invoiceRef.current) return

    const element = invoiceRef.current
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`invoice-${orderData.orderId}.pdf`)

    if (onGenerate) onGenerate()
  }

  const printInvoice = () => {
    if (!invoiceRef.current) return
    const printContent = invoiceRef.current.innerHTML
    const originalContent = document.body.innerHTML

    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = originalContent
    window.location.reload()
  }

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <button
          onClick={generatePDF}
          className="btn-primary flex items-center gap-2"
        >
          <FiDownload className="w-5 h-5" />
          Download PDF
        </button>
        <button
          onClick={printInvoice}
          className="btn-outline flex items-center gap-2"
        >
          <FiPrinter className="w-5 h-5" />
          Print Invoice
        </button>
      </div>

      {/* Invoice Template */}
      <div
        ref={invoiceRef}
        className="bg-white p-8 max-w-4xl mx-auto shadow-lg"
        style={{ minHeight: '800px' }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
            <p className="text-gray-600">Invoice #: {orderData.orderId}</p>
            <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-2">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <p className="font-bold text-gray-900">ShopSphere</p>
            <p className="text-sm text-gray-600">123 Commerce Street</p>
            <p className="text-sm text-gray-600">New York, NY 10001</p>
            <p className="text-sm text-gray-600">United States</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bill To:</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-900">{orderData.customerName}</p>
            <p className="text-gray-600">{orderData.customerEmail}</p>
            <p className="text-gray-600">{orderData.customerPhone}</p>
            <p className="text-gray-600 mt-2">
              {orderData.shippingAddress.address}<br />
              {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{' '}
              {orderData.shippingAddress.zip}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details:</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Item</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Qty</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Price</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </td>
                  <td className="text-center py-3 px-4">{item.quantity}</td>
                  <td className="text-right py-3 px-4">${item.price.toFixed(2)}</td>
                  <td className="text-right py-3 px-4 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${orderData.subtotal.toFixed(2)}</span>
            </div>
            {orderData.discount > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">
                  -${orderData.discount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="font-medium">${orderData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {orderData.shipping === 0 ? 'Free' : `$${orderData.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-gray-900">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-xl text-gray-900">
                ${orderData.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-6 mt-8">
          <p className="text-sm text-gray-600 mb-2">
            Thank you for your purchase! If you have any questions, please contact us at
            support@shopsphere.com
          </p>
          <p className="text-sm text-gray-500">
            Payment Method: {orderData.paymentMethod}
          </p>
          <p className="text-sm text-gray-500">
            Order Status: <span className="font-semibold text-green-600">{orderData.status}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default InvoiceGenerator
