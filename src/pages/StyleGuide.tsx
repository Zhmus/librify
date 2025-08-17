import React from 'react';

const StyleGuide = () => {
  return (
    <div className="container py-3">
      <h1>Style Guide</h1>

      <section>
        <h2>Font Sizes</h2>
        <div className="my-2">
          <span className="fs-6">Base font size (Root)</span>
        </div>
        <div className="my-2">
          <span className="fs-7">Small font size</span>
        </div>
        <div className="my-2">
          <span className="fs-5">Large font size</span>
        </div>
      </section>

      <section className="mt-4">
        <h2>Headings</h2>
        <h1 className="fs-1">Heading 1 (h1)</h1>
        <h2 className="fs-2">Heading 2 (h2)</h2>
        <h3 className="fs-3">Heading 3 (h3)</h3>
        <h4 className="fs-4">Heading 4 (h4)</h4>
        <h5 className="fs-5">Heading 5 (h5)</h5>
        <h6 className="fs-6">Heading 6 (h6)</h6>
      </section>

      <section className="mt-4">
        <h2>Colors</h2>
        <div className="row">
          {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map(
            (color, index) => (
              <div key={index} className="col-3">
                <div className={`bg-${color} text-white p-3`}>
                  <p className="text-center">{color}</p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="mt-4">
        <h2>Button Sizes</h2>
        {['btn-sm', 'btn-md', 'btn-lg'].map((size, index) => (
          <button key={index} className={`btn btn-primary ${size} m-2`}>
            Button {size}
          </button>
        ))}
      </section>

      <section className="mt-4">
        <h2>Input Sizes</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-sm mb-2"
            placeholder="Small Input"
          />
          <input type="text" className="form-control mb-2" placeholder="Medium Input" />
          <input type="text" className="form-control form-control-lg" placeholder="Large Input" />
        </div>
      </section>

      <section className="mt-4">
        <h2>Alerts</h2>
        {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map(
          (type, index) => (
            <div key={index} className={`alert alert-${type}`} role="alert">
              This is a {type} alert!
            </div>
          )
        )}
      </section>

      <section className="mt-4">
        <h2>Spacing</h2>
        <div className="m-3 p-3 bg-light border">
          <p>This element has margin and padding applied.</p>
        </div>
        <div className="my-5 p-3 bg-light border">
          <p>This element has vertical margin.</p>
        </div>
        <div className="px-4 py-2 bg-light border">
          <p>This element has horizontal padding.</p>
        </div>
      </section>
    </div>
  );
};

export default StyleGuide;
