import React, {useSteate} from 'react';

export default function NewProduct() {

  const [product, setProjduct] = useSteate({});
  const handleSubmit = (e) => {};
  const handleChange = (e) => {};

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h4>New Products</h4>
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />
      </form>
    </section>
  );
}
