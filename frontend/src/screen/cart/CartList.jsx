import React from 'react'

const CartList = () => {
  return (
    <div>
      <div className="container mt-5">
  <h2>Shopping Cart</h2>
  <div className="row">
    <div className="col-12">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="cart-item">
            <td>
              <img src="https://via.placeholder.com/100" alt="Product Image" />
              <span>Product 1</span>
            </td>
            <td>
              <input type="number" className="form-control w-50" defaultValue={1} />
            </td>
            <td>$10.00</td>
            <td>$10.00</td>
            <td>
              <button className="btn btn-info btn-update">Update</button>
              <button className="btn btn-danger btn-remove">Remove</button>
            </td>
          </tr>
          <tr className="cart-item">
            <td>
              <img src="https://via.placeholder.com/100" alt="Product Image" />
              <span>Product 2</span>
            </td>
            <td>
              <input type="number" className="form-control w-50" defaultValue={2} />
            </td>
            <td>$15.00</td>
            <td>$30.00</td>
            <td>
              <button className="btn btn-info btn-update">Update</button>
              <button className="btn btn-danger btn-remove">Remove</button>
            </td>
          </tr>
          {/* Add more items here */}
        </tbody>
      </table>
      <div className="text-right cart-total">
        Total: $40.00
      </div>
      <div className="text-right mt-3">
        <button className="btn btn-primary">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default CartList
