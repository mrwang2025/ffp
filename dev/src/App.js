import AppBar from "@material-ui/core/AppBar";
import Link from '@material-ui/core/Link';
import { createStyles, createTheme, makeStyles, MuiThemeProvider, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import React, { Suspense, useEffect, useState } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ErrorBoundary from "./common/errorBoundary";
import LoadingBar from "./common/loadingBar";
const _ = require('lodash')
const EXAMPLE_TITLE_LIST = [
  {
    title: 'Dashboard Examples',
    fileName: 'dashboardExample'
  },
]

function getMuiTheme() {
  return createTheme({
    overrides: {
      MuiPaper: {
        rounded: {
          borderRadius: 5
        },
        elevation2: {
          boxShadow: ["none"]
        }
      },
      MuiButton: {
        root: {
          textTransform: 'none'
        }
      }
    }
  });
}

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      flexGrow: 1,
      marginLeft: 10,
      marginRight: 40
    }
  })
);

function BlankContent() {
  return <div>Welcome</div>
}

function TitleHeader(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  return <div className={classes.header}>
    <span style={{ paddingRight: 10, fontWeight: 'bold' }}>@mrwang2025/react-ui</span>
    {props.match.params.x || ''}
  </div>
}

function MenuItem({ title, fileName }) {
  return <Link href={fileName || '#'} target={'_self'} color="inherit" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    color: 'royalblue',
    padding: 5
  }}>
    <WidgetsRoundedIcon style={{ fontSize: 16, marginRight: 5 }} />
    {title}
  </Link>
}

function MenuList() {
  return <div style={{ height: '100%', paddingLeft: 10, paddingTop: 10 }}>
    {
      EXAMPLE_TITLE_LIST.map(example => <MenuItem
        title={example.title}
        fileName={example.fileName}
        key={`example-${example.fileName}`} />)
    }
  </div>
}

function CodeView(props) {
  const [code, setCode] = useState('loading...');
  useEffect(() => {
    const exampleName = props.match.params.x || ''
    fetch(`${process.env.PUBLIC_URL}/code/${exampleName}.js`)
      .then((r) => r.text())
      .then(text => {
        console.log(text);
        setCode(text)
      }).catch(e => {
        console.error(e)
        setCode(`Can't find the example source code`)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.x])

  return <div>
    <div style={{ padding: 10 }}>Code View</div>
    <SyntaxHighlighter
      language="javascript"
      style={vs2015}
      wrapLongLines={true}
      showLineNumbers={true}
    >
      {code}
    </SyntaxHighlighter>
  </div>
}


function ExampleView(props) {
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    const exampleName = props.match.params.x || ''
    if (_.find(EXAMPLE_TITLE_LIST, example => example.fileName.toLowerCase() === exampleName.toLowerCase())) {
      try {
        const Viewer = React.lazy(() => import(`./examples/${exampleName}.js`));
        if (Viewer) {
          setViewer(<Viewer />)
        }
      } catch (error) {
        setViewer(<div>Error! Can not find example {exampleName}</div>)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.x])

  return <Suspense fallback={<LoadingBar estimateSeconds={3} />}>
    {viewer}
  </Suspense>
}

function App() {
  return <Router>
    <MuiThemeProvider theme={getMuiTheme()}>
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div>
          <AppBar position="relative">
            <Toolbar>
              {/* <img
              src={process.env.PUBLIC_URL + "/mrwang2025.logo"}
              className="header-logo"
              alt="mrwang2025 logo"
            /> */}
              <Switch>
                <Route path="/:x" component={TitleHeader} />
                <Route path="/" component={TitleHeader} />
              </Switch>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ flex: 2, overflow: 'auto' }}>
          <ReflexContainer orientation="vertical" style={{ with: '100%', height: '100%' }}>
            <ReflexElement minSize={200} size={300}>
              <div>
                <MenuList />
              </div>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement>
              <ReflexContainer orientation="horizontal" style={{ with: '100%', height: '100%' }}>
                <ReflexElement>
                  <ErrorBoundary>
                    <Switch>
                      <Route path="/:x" component={ExampleView} />
                      <Route path="/" component={BlankContent} />
                    </Switch>
                  </ErrorBoundary>
                </ReflexElement>
                <ReflexSplitter propagate={true} />
                <ReflexElement>
                  <Switch>
                    <Route path="/:x" component={CodeView} />
                    <Route path="/" component={BlankContent} />
                  </Switch>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </div>
      </div>
    </MuiThemeProvider>
  </Router>
}

export default App;
