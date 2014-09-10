require 'spec_helper'

describe Stock do
  it 'has a valid factory' do
    FactoryGirl.create(:stock).should be_valid
  end
  it 'is invalid without a ticker' do
    FactoryGirl.build(:stock, ticker: nil).should_not be_valid
  end
  it 'is invalid without a name' do
    FactoryGirl.build(:stock, name: nil).should_not be_valid
  end
end
