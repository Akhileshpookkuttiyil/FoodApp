
const metrics = [
  {
    title: "Total Products",
    value: "120",
    description: "You have 120 products in your store.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAUOFHS42GZg16DM9gHOTfi3N6MpfkOmAPDaOY19H7nMkPAfI27bPqfeO_Rpp95wAB6NmbiuWpDGNK1RxT4x5lzrhDbVUAyJD8O0J9EYTXsamgLURQDfYAe-SsqbUYiE3f_OyCLjg9NrqMMqwwGAcAV9a7vsJRdPa6pWb5Q7SicssL5nkTHY9neQfamCNuOAWsvaRtSeV3GKcBdZygSLOX8FH9O_cpzOVFnmVWDZZEf6J6sf_ks0mfXz4-I70DL4EXFMmvgLB1wwM",
  },
  {
    title: "Total Orders",
    value: "500",
    description: "You have received 500 orders.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIbf51POQMR68BHUI82w9JdkfFP3GVD9UmmSrEjVpQ13Fr4n75K-Usv544roLBkvyWW7EV3rbOIvgdrwuTwfb-PbfRprxlB0-OV-xTiNNLKW_akXWzD0axjv7DI7W2QIDFEpX5j0ZN3rqSjwFbobTx0cr5j9ISoCiO7-rEBBO_ff_29lf1gDGhwPDFDedZ9NgQAEW-JiokgyJAPCBLqMg5DWgvn2HC1zpn8y_yaf1J8n1V0xs8ieNv6ELwCrhNLDJte6rIaUZIMMo",
  },
  {
    title: "Total Users",
    value: "250",
    description: "You have 250 registered users.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBo-YRepQYaZSY8eQsisO4F3cyZi6ZHSN_R28WsIHFIOG-YZY7_5jcUtwxjgqwlq8Z-XPFQ817RM-BmvQ-mQA-nlh_mlEFJY0pXu7DxXUWzWEm8-6OltDjuIUnGsNpuxbHwFPx-P4-iMAWvxXflY3Th_lReu8JclvbFD1lRwjm1WONNUL4lmFrkG1-R9aUqUla8sJpJaVPjnhSHJna1WIfSuUzjiHlZSGoxNqtVsphHpjV6ZWUaluRAJkJOq4pxjAX8Fl6Kjqt4TUg",
  },
  {
    title: "Total Revenue",
    value: "$10,000",
    description: "You have generated $10,000 in revenue.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-tTk86YALIV3BHnBL6WtMkXE37hkoGjIkZgU4EqrD7XYoEqz9e0dBHISKY5JDG2aZLTbbKAIZ5UDyEUGaSjA2IDO_wgSOY-Qr95_YOWS-_-y42hLoLBmmX0GKBbF1fEBUv3qookl6rbFd0JMutZTFVlgNL6uHNUyvaDGhkJYixiSzuMUe_205dd8Q00Je84rPSJbsNkiHsE2Mr3egn_VXrt9HMBNFG_AYld8xD0jlpULfw3_tUysOR8QfoAJ75PvudZIh0Ua6rTM",
  },
];

const DashboardOverview = () => {
  return (
    <div className="flex flex-1 justify-center">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-2">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
              Overview
            </p>
            <p className="text-[#60758a] text-sm font-normal leading-normal">
              View a summary of your business performance.
            </p>
          </div>
        </div>

        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Key Metrics
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{ backgroundImage: `url(${metric.imageUrl})` }}
              ></div>
              <div>
                <p className="text-[#111418] text-base font-medium leading-normal">
                  {metric.title}: {metric.value}
                </p>
                <p className="text-[#60758a] text-sm font-normal leading-normal">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
