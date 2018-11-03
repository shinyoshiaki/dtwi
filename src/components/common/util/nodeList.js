import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@material-ui/core";

export default class NodeList extends Component {
  kbuckets = [];
  toUser = id => {};

  render() {
    const { val, func } = this.props;
    if (val && func) {
      this.kbuckets = val.kbuckets;
      this.toUser = func.toUser;
    }
    console.log("nodelist", this.kbuckets);
    return (
      <div style={{ margin: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>index</TableCell>
              <TableCell>nodes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.kbuckets.map((kbucket, i) => {
              return kbucket.length > 0 ? (
                <TableRow key={i}>
                  <TableCell>{i}</TableCell>
                  <TableCell>
                    {kbucket.map((peer, i) => {
                      return (
                        <Button
                          key={i}
                          onClick={() => {
                            this.toUser(peer.nodeId);
                          }}
                        >
                          {peer.nodeId}
                        </Button>
                      );
                    })}
                  </TableCell>
                </TableRow>
              ) : (
                undefined
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export function createNodeList(
  val = { kbuckets: [] },
  func = { toUser: id => {} }
) {
  return <NodeList val={val} func={func} />;
}
