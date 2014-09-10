require 'spec_helper'

describe User do
  it 'has a valid factory' do
    FactoryGirl.create(:user).should be_valid
  end
  it 'is invalid without a name' do
    FactoryGirl.build(:user, name: nil).should_not be_valid
  end

  describe 'filter name by letter' do
    before :each do
      @jackie = FactoryGirl.create(:user, name: "Jackie Fu")
      @ben = FactoryGirl.create(:user, name: "Ben Smith")
      @betty = FactoryGirl.create(:user, name: "Betty Yup")
    end

    context 'matching letters' do
      it 'returns a sorted array of results' do
        User.by_letter("B").should == [@ben, @betty]
      end
    end

    context 'non-matching letters' do
      it 'does not return names that do not start with provided letter' do
        User.by_letter("B").should_not include @jackie
      end
    end
  end
end
