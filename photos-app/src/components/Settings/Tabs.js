import React from 'react';



export default function Tabs(props) {

  const { highlight, hostReact, labels, contents , onChange} = props




  const { initialActiveIndex } = props
  const tabsData = labels.map((label, index) => {
    return {
      label,
      content: contents[index]
    }
  })

  const [activeTabIndex, setActiveTabIndex] = hostReact.useState(initialActiveIndex || 0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = hostReact.useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = hostReact.useState(0);

  const tabsRef = hostReact.useRef([]);

  hostReact.useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    if(onChange) onChange(activeTabIndex);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  return (
    <div>
      <div className="relative">
        <div className="flex space-x-3 border-b">
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                ref={(el) => (tabsRef.current[idx] = el)}
                className="pt-2 pb-3 px-2"
                onClick={() => setActiveTabIndex(idx)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span
          className={`absolute bottom-0 block h-1 ${highlight ? highlight : "bg-teal-500"} transition-all duration-300`}
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className="py-4">
        <p>{tabsData[activeTabIndex].content}</p>
      </div>
    </div>
  );
}
