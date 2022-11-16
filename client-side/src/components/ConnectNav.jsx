/* create another nav for Stripe Connected Merchants 
    we need to use the user state from redux, and check if this user has already connected with Stripe */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../actions/stripe";
import { toast } from "react-toastify";

const { Meta } = Card;
const { Ribbon } = Badge;

export default function ConnectNav() {
  //state
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  /*this action will take some time, after click, frontend will request backend, backend will request stripe
    So during that time, we can throw a loading icon
  */
  const handlePayoutSettings = async () => {
    setLoading(true); //so there will be a loading icon
    try {
      const res = await payoutSetting(auth.token);
      //console.log("Response for Payout Setting Link ===> ", res);

      window.location.href = res.data.url;
      setLoading(false);
      //
    } catch (error) {
      console.log("handlePayoutSettings ===> ", error);
      setLoading(false);
      toast("Unable to access settings. Try again");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-around">
        <Card>
          <Meta
            avatar={<Avatar>{user.name[0]}</Avatar>}
            title={user.name}
            description={`Joined ${moment(user.createAt).fromNow()}`}
          />
        </Card>

        {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled ? (
          <>
            <Ribbon text="Available" color="grey">
              <Card className="bg-light pt-1">
                {balance && balance.pending
                  ? balance.pending.map((balance, index) => {
                      return (
                        <span key={index} className="lead">
                          {currencyFormatter(balance)}
                        </span>
                      );
                    })
                  : null}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="silver">
              <Card onClick={handlePayoutSettings} className="bg-light pointer">
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        ) : null}
      </div>
    </>
  );
}
