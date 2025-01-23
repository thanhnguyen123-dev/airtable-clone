const HomeContent = () => {
  return (
    <div className="flex flex-col p-10 w-full">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <div className="flex flex-wrap gap-4">
        <div role="button" className="rec-cell">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="flex-none"
              fill="rgb(221, 4, 168)"
            >
              <path fill-rule="nonzero" d="M8 14C7.70462 14 7.46461 13.7969 7.4 13.5108L7.29846 13.04C6.83693 10.8707 5.12921 9.16308 2.96 8.70154L2.48923 8.6C2.20308 8.53538 2 8.29539 2 8C2 7.70461 2.20308 7.46462 2.48923 7.4L2.96 7.29846C5.12921 6.83692 6.83693 5.12926 7.29846 2.96L7.4 2.48923C7.46461 2.20307 7.70462 2 8 2C8.29538 2 8.53539 2.20307 8.6 2.48923L8.70154 2.96C9.16307 5.12926 10.8708 6.83692 13.04 7.29846L13.5108 7.4C13.7969 7.46462 14 7.70461 14 8C14 8.29539 13.7969 8.53538 13.5108 8.6L13.04 8.70154C10.8708 9.16308 9.16307 10.8707 8.70154 13.04L8.6 13.5108C8.53539 13.7969 8.29538 14 8 14ZM3.88308 8C5.82152 8.65539 7.34462 10.1877 8 12.1169C8.65538 10.1784 10.1877 8.65539 12.1169 8C10.1785 7.34461 8.65538 5.81233 8 3.88308C7.34462 5.82156 5.81229 7.34461 3.88308 8Z"/>
            </svg>
            <h2 className="font-medium">Start with AI</h2>
          </div>
          <p className="rec-cell-p">Turn your process into an app with data and interfaces using AI.</p>
        </div>

        <div role="button" className="rec-cell">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="flex-none"
              fill="rgb(99, 73, 141)"
            >
              <path fill-rule="nonzero" d="M3.25 2.25C2.70364 2.25 2.25 2.70364 2.25 3.25V12.75C2.25 13.2964 2.70364 13.75 3.25 13.75H12.75C13.2964 13.75 13.75 13.2964 13.75 12.75V3.25C13.75 2.70364 13.2964 2.25 12.75 2.25H3.25ZM3.25 3.25H7.5V7.5H3.25V3.25ZM8.5 3.25H12.75V7.5H8.5V3.25ZM3.25 8.5H7.5V12.75H3.25V8.5ZM8.5 8.5H12.75V12.75H8.5V8.5Z" />
            </svg>
            <h2 className="font-medium">Start with templates</h2>
          </div>
          <p className="rec-cell-p">Select a template to get started and customize as you go.</p>
        </div>

        <div role="button" className="rec-cell">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="flex-none"
              fill="rgb(13, 127, 120)"
            >
              <path fill-rule="nonzero" d="M7.99999 2C7.86739 2.00002 7.74022 2.05271 7.64647 2.14648L3.14647 6.64648C3.05272 6.74025 3.00006 6.86741 3.00006 7C3.00006 7.13259 3.05272 7.25975 3.14647 7.35352C3.24023 7.44726 3.3674 7.49992 3.49999 7.49992C3.63258 7.49992 3.75974 7.44726 3.8535 7.35352L7.49999 3.70703V13.5C7.49999 13.6326 7.55266 13.7598 7.64643 13.8536C7.7402 13.9473 7.86738 14 7.99999 14C8.13259 14 8.25977 13.9473 8.35354 13.8536C8.44731 13.7598 8.49999 13.6326 8.49999 13.5V3.70703L12.1465 7.35352C12.2402 7.44726 12.3674 7.49992 12.5 7.49992C12.6326 7.49992 12.7597 7.44726 12.8535 7.35352C12.9472 7.25975 12.9999 7.13259 12.9999 7C12.9999 6.86741 12.9472 6.74025 12.8535 6.64648L8.3535 2.14648C8.34865 2.14437 8.34377 2.14234 8.33885 2.14038C8.24776 2.05235 8.12665 2.00218 7.99999 2Z" />
            </svg>
            <h2 className="font-medium">Quickly upload</h2>
          </div>
          <p className="rec-cell-p">Easily migrate your existing projects in just a few minutes.</p>
        </div>

        <div role="button" className="rec-cell">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              className="flex-none"
              fill="rgb(59, 102, 163)"
            >
              <path fill-rule="nonzero" d="M2 3C1.8674 3.00001 1.74023 3.0527 1.64646 3.14646C1.5527 3.24023 1.50001 3.3674 1.5 3.5V12C1.50007 12.5463 1.95357 12.9999 2.49988 13C2.49984 13 2.49992 13 2.49988 13H13.5C14.0464 13 14.5 12.5464 14.5 12V3.5C14.5 3.3674 14.4473 3.24023 14.3535 3.14646C14.2598 3.0527 14.1326 3.00001 14 3H2ZM2.5 4H13.5V6H2.5V4ZM2.5 7H5V9H2.5V7ZM6 7H13.5V9H6V7ZM2.5 10H5V12H2.50012L2.5 10ZM6 10H13.5V12H6V10Z" />
            </svg>
            <h2 className="font-medium">Start from scratch</h2>
          </div>
          <p className="rec-cell-p">Create a new blank base with custom tables, fields, and views.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
